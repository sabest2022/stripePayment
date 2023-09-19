const express = require("express");
const { handleWebhook } = require("../controllers/webhook.controller");

const webhookRouter = express
    .Router()
    .post('/webhook', express.raw({ type: 'application/json' }), handleWebhook)

module.exports = { webhookRouter };

