const express = require("express");
const { register, login, logout } = require("../controllers/customers.controller");
const jwt = require('jsonwebtoken');


const customerRouter = express
    .Router()
    .post("/customers/register", register)
    .post("/customers/login", login)
    .post("/customers/logout", logout)
    .get('/customers/status', (req, res) => {
        const token = req.cookies['auth-token'];
        // console.log("Checking auth status. Token:", token);

        if (token) {
            try {
                jwt.verify(token, 'your_secret_key');
                // console.log("Token verified successfully.");
                res.status(200).send();
            } catch (err) {
                console.log("Token verification failed:", err.message);
                res.status(401).send();
            }
        } else {
            // console.log("No token found in the request.");
            res.status(401).send();
        }
    });




// .get("/customers/authorize", authorize);

module.exports = { customerRouter };