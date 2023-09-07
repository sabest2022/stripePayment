
const bcrypt = require("bcrypt");
const path = require('path');
require("dotenv").config();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const stripe = require("stripe")(process.env.STRIPE_KEY)
const CLIENT_URL = "http://localhost:5174"

const usersFilePath = path.join(__dirname, '../db', 'custumers.json');
// console.log(usersFilePath);
// const jsonData = fs.readFileSync(usersFilePath, "utf-8");
// JSON.parse(jsonData);
let users = [];
// const usersFilePath = "../db/customers.json";

async function createStripeUser(req) {
    const createCustomer = await stripe.customer.create({
        username: req.body.username,
        passwiord: req.body.password
    }),

    const customerId = stripe.customer.id
}

const usersJson = fs.readFileSync(usersFilePath, "utf8");
users = JSON.parse(usersJson);


async function login(req, res) {
    console.log("The endpoint does work!")
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    console.log(users);
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username: user.username }, 'your_secret_key', { expiresIn: '1h' });
        res.status(200).json({ message: "Logged in", token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
}
// Write data to JSON file
// const writeToJson = (filePath, data) => {
//     fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
// };


async function register(req, res) {


    const existingUser = users.find((user) => user.username === req.body.username);

    if (existingUser) {
        return res.status(409).json("Email already registered");
    }
    // Hash the password and save the user
    const user = { ...req.body, password: await bcrypt.hash(req.body.password, 10) };
    users.push(user);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    const jsonUser = { ...user };
    delete jsonUser.password;
    // res.status(201).send(jsonUser);
    res.status(201).json({ message: "User registered" });
}



//   Logout the user and remove the cookie and session

async function logout(req, res) {
    if (!req.session._id) {
        return res.status(400).json("Cannot logout when you are not logged in");
    }
    req.session = null;
    res.status(204).json(null);
}

async function authorize(req, res) {
    if (!req.session._id) {
        return res.status(401).json("You are not logged in");
    }
    res.status(200).json(req.session);
}

module.exports = { register, login, logout, authorize };
