require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser');
const path = require('path');
const { customerRouter } = require("./routes/customers.route");
const { productsRouter } = require("./routes/products.route");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const fs = require('fs');

const usersFilePat = path.join(__dirname, './db', "custumers.json");
// console.log(usersFilePat)
// const jsonData = fs.readFileSync(usersFilePat, "utf-8");
// JSON.parse(jsonData);
// console.log(jsonData);
const stripe = require("stripe")(process.env.STRIPE_KEY)
const CLIENT_URL = "http://localhost:5173"

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}
));


app.use(cookieParser());

// app.use((req, res, next) => {
//     console.log(`Request URL: ${req.url}`);
//     console.log(`Request Method: ${req.method}`);
//     next();
// });
app.use(express.json());
app.use('/api', customerRouter);
app.use('/api', productsRouter);


const getStripeCustomerIdByEmail = (email) => {
    // Read the db.json file synchronously
    const data = fs.readFileSync(usersFilePat, 'utf8');

    // Parse the file contents into a JavaScript array
    const users = JSON.parse(data);

    // Find the user with the matching email (or username)
    console.log(email);
    const user = users.find(user => user.username === email);
    console.log(user.stripeCustomerId);
    // If found, return the stripeCustomerId, else return null or handle appropriately

    return user ? user.stripeCustomerId : null;
};


const authenticateJWT = (req, res, next) => {
    const token = req.cookies['auth-token'];

    if (!token) return res.status(401).send("No token provided");


    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        console.log(decoded)
        req.username = decoded.username; // Passing email to the next middleware

        next();
    } catch (err) {
        console.log(token);
        res.status(408).send("Invalid token");
    }
};

app.post("/create-checkout-session", authenticateJWT, async (req, res) => {
    const userEmail = req.username;

    // Get the customer ID from your local DB using userEmail
    // This is a hypothetical function; implement it based on your actual data storage setup
    const stripeCustomerId = getStripeCustomerIdByEmail(userEmail);

    try {
        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomerId,
            line_items: req.body.map(item => {
                return {
                    price: item.product,
                    quantity: item.quantity
                }
            }),
            mode: "payment",
            success_url: `${CLIENT_URL}/confirmation`,
            cancel_url: CLIENT_URL
        });

        res.status(200).json({
            url: session.url,
            sessionId: session.id,
            paymentStatus: session.payment_status
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).send("Det gick inte bra");
    }
});



app.listen(3000, () => console.log("Server is runing and up on port 3000..."));