const express = require("express");
const { fetchProducts } = require("../controllers/products.controller");

const productsRouter = express
    .Router()
    .get("/products", async (req, res) => {
        try {
            const products = await fetchProducts();
            res.json(products);   // Send the products as response
        } catch (error) {
            console.error("Error in route:", error);
            res.status(500).send("Error fetching products.");
        }
    });

module.exports = { productsRouter };

