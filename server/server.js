require("dotenv").config();
const express = require("express")

const cors = require("cors")
const stripe = require("stripe")(process.env.STRIPE_KEY)
const app = express();
const CLIENT_URL = "http://localhost:5173"
app.use(cors({
    oriign: "*",
}
));
app.use(express.json());

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
app.listen(3000, () => console.log("Server is runinig and up..."));