require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require('path');
const { customerRouter } = require("./routes/customers.route");
const cors = require("cors");

const usersFilePat = path.join(__dirname, './db', "customers.json");
// console.log(usersFilePat)
// const jsonData = fs.readFileSync(usersFilePat, "utf-8");
// JSON.parse(jsonData);
// console.log(jsonData);
const stripe = require("stripe")(process.env.STRIPE_KEY)
const CLIENT_URL = "http://localhost:5174"

const app = express();

app.use(cors({
    origin: "*",
}
));

// app.use((req, res, next) => {
//     console.log(`Request URL: ${req.url}`);
//     console.log(`Request Method: ${req.method}`);
//     next();
// });
app.use(express.json());
app.use('/api', customerRouter);

// let users = [];
// const usersFilePath = "./db/custumers.json";
// if (fs.existsSync(usersFilePath)) {
//     const usersJson = fs.readFileSync(usersFilePath, "utf8");
//     users = JSON.parse(usersJson);
// }

app.post("/create-checkout-session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: req.body.map(item => {
                return {
                    price: item.product,
                    quantity: item.quantity
                }
            }),
            // [{price: 'price_1NmwsHAZbxXHiVZz62iKEfqF', quantity: 2 }],
            mode: "payment",
            success_url: `${CLIENT_URL}/confirmation`,
            cancel_url: CLIENT_URL
        });
        res.status(200).json({ url: session.url });
    } catch (error) {
        console.log(error.message);

        res.status(400).send("Det gick inte bra");
    }
});


app.listen(3000, () => console.log("Server is runing and up..."));