

const stripe = require("stripe")(process.env.STRIPE_KEY)// server.js or wherever your routes are defined



async function fetchProducts() {
    try {
        const productsResponse = await stripe.products.list({ active: true });

        // Now fetch the prices for each product
        const productPricesPromises = productsResponse.data.map(async (product) => {
            const pricesResponse = await stripe.prices.list({ product: product.id });
            // Assume each product has one price. If a product can have multiple prices, you may need adjustments.
            return { ...product, price: pricesResponse.data[0] };
        });

        const products = await Promise.all(productPricesPromises);
        console.log(products);
        return products;

    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Error fetching products.");
    }
}
module.exports = { fetchProducts };