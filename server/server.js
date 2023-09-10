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
const ordersFilePath = path.join(__dirname, './db', "orders.json");
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

const endpointSecret = "whsec_925f5e6e5a8acabe41114d465fcfa5b1e557567d324115618bd7842e6ad22f13";

app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        console.error(err.stack);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            break;
        case 'checkout.session.completed':
            try {
                const checkoutSession = event.data.object;
                console.log("checkoutSession", checkoutSession);

                const amountTotal = checkoutSession.amount_total;
                const currency = checkoutSession.currency;
                const customerId = checkoutSession.customer;
                const customer = checkoutSession.customer_details.email;
                const paymentStatus = checkoutSession.payment_status;
                const eventCreatedAt = event.created;

                const paymentCompletedDate = new Date(eventCreatedAt * 1000);

                // Retrieve the session's line items
                const fullSession = await stripe.checkout.sessions.retrieve(checkoutSession.id, {
                    expand: ['line_items'],
                },);
                const lineItems = fullSession.line_items.data;
                const orderedItems = lineItems.map(item => {
                    return {
                        name: item.description,
                        price: item.price.unit_amount,
                        quantity: item.quantity
                    };
                });
                const order = { customerId, customer, amountTotal, currency, orderedItems, paymentStatus, paymentCompletedDate };
                console.log("Line items:", orderedItems);
                // Save order details
                const ordersJson = fs.readFileSync(ordersFilePath, "utf8");
                const orders = JSON.parse(ordersJson);
                orders.push(order);
                fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));


            } catch (error) {
                console.error("Error processing checkout.session.completed event:", error);
            }
            break;

        case 'charge.succeeded':
            const chargeSucceded = event.data.object;
            // console.log("chargeSucceded", chargeSucceded);
            break;
        case 'payment_intent.created':
            const paymentIntentCreated = event.data.object;
            // console.log("paymentIntentCreated", paymentIntentCreated);
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
});


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

    if (!token) return res.status(401).json("No token provided");


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
// This is your Stripe CLI webhook secret for testing your endpoint locally.





app.listen(3000, () => console.log("Server is runing and up on port 3000..."));