
const stripe = require("stripe")(process.env.STRIPE_KEY)
const CLIENT_URL = "http://localhost:5173"
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');
const usersFilePat = path.join(__dirname, '../db', "custumers.json");


const getStripeCustomerIdByEmail = (email) => {
    // Read the db.json file synchronously
    const data = fs.readFileSync(usersFilePat, 'utf8');
    // Parse the file contents into a JavaScript array
    const users = JSON.parse(data);
    // Find the user with the matching email (or username)
    const user = users.find(user => user.username === email);
    // If found, return the stripeCustomerId, else return null or handle appropriately
    return user ? user.stripeCustomerId : null;
};
const authenticateJWT = (req, res, next) => {
    const token = req.cookies['auth-token'];
    if (!token) return res.status(401).json("No token provided");
    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        req.username = decoded.username; // Passing email to the next middleware
        next();
    } catch (err) {
        console.log(token);
        res.status(400).send("Invalid token");
    }
};
const createCheckoutSession = async (req, res) => {
    const userEmail = req.username;
    // Get the customer ID from your local DB using userEmail
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
            allow_promotion_codes: true,
            success_url: `${CLIENT_URL}/confirmation`,
            cancel_url: CLIENT_URL,

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
};

module.exports = { createCheckoutSession, authenticateJWT };