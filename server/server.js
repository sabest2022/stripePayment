require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser');
const { customerRouter } = require("./routes/customers.route");
const { productsRouter } = require("./routes/products.route");
const { checkoutRouter } = require("./routes/checkout.route");
const { webhookRouter } = require("./routes/webhook.route");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}
));

app.use(cookieParser());
app.use(webhookRouter);
app.use(express.json());
app.use('/api', customerRouter, productsRouter, checkoutRouter);

app.listen(3000, () => console.log("Server is runing and up on port 3000..."));