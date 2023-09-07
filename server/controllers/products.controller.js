

const stripe = require("stripe")(process.env.STRIPE_KEY)// server.js or wherever your routes are defined



async function fetchProducts() {
    try {

        const products = await stripe.products.list();
        return products;

    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Error fetching products.");
    }
}
module.exports = { fetchProducts };