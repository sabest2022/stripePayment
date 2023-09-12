const express = require("express");
const { createCheckoutSession, authenticateJWT } = require("../controllers/checkout.controller");

const checkoutRouter = express
    .Router()
    .post("/create-checkout-session", authenticateJWT, createCheckoutSession)

module.exports = { checkoutRouter };