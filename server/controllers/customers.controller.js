
const bcrypt = require("bcrypt");
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const stripe = require("stripe")(process.env.STRIPE_KEY)

const usersFilePath = path.join(__dirname, '../db', 'custumers.json');
let users = [];
// const usersFilePath = "../db/customers.json";

const usersJson = fs.readFileSync(usersFilePath, "utf8");
users = JSON.parse(usersJson);

const authorize = (req, res) => {
    const token = req.cookies['auth-token'];

    if (token) {
        try {
            const decoded = jwt.verify(token, 'your_secret_key');
            res.status(200).send({ message: `Hi, ${decoded.username}` });
        } catch (err) {
            console.log("Token verification failed:", err.message);
            res.status(401).send();
        }
    } else {
        res.status(401).send();
    }
};

async function login(req, res) {
    // console.log("The endpoint does work!")
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);

    // Case: User does not exist
    if (!user) {
        return res.status(401).json({ message: "Username or password is wrong" });
    }

    // Case: User exists but password doesn't match
    if (!await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: "Username or password is wrong" });
    }

    // Case: User exists and password matches
    const token = jwt.sign({ username: user.username }, 'your_secret_key', { expiresIn: '1h' });
    console.log(user);
    // Set JWT token as an httpOnly cookie
    res.cookie('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 3600000,  // The cookie will expire in 1 hour (value is in milliseconds)
        sameSite: 'strict'
    });

    console.log("Sending Logged in response...");
    res.status(200).json({ message: ` Hi, ${username}` });
}


async function register(req, res) {
    const existingUser = users.find((user) => user.username === req.body.username);

    if (existingUser) {
        return res.status(409).json({ message: "Email already registered, choose another one!" });
    }
    try {
        // Create customer in Stripe
        const createdCustomer = await stripe.customers.create({
            // You might want to provide email or other details here, not password.
            email: req.body.username,
            description: `Customer for ${req.body.username}`
        });

        // Get customerId from createdCustomer
        const customerId = createdCustomer.id;
        // Hash the password and save the user
        const user = {
            ...req.body, password: await bcrypt.hash(req.body.password, 10),
            stripeCustomerId: customerId
        };
        console.log(user);

        users.push(user);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

        const token = jwt.sign({ username: user.username }, 'your_secret_key', { expiresIn: '1h' });
        console.log(user.username)
        // Set JWT token as an httpOnly cookie
        res.cookie('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 3600000,  // The cookie will expire in 1 hour (value is in milliseconds)
            sameSite: 'strict'
        });

        res.status(201).json({ message: `${user.username} is registered` });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Internal Server Error'); // or some other appropriate error message or status
    }
}
//   Logout the user and remove the cookie and session

async function logout(req, res) {
    // If using token blacklisting, add the token from the cookie to the blacklist.

    // Clear the auth cookie
    res.cookie('auth-token', '', {
        expires: new Date(0),
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict'
    });

    res.status(200).json({ message: "Logged out" });
}

module.exports = { register, login, logout, authorize, authorize };
