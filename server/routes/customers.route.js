const express = require("express");
const { register, login, logout } = require("../controllers/customers.controller");


const customerRouter = express
    .Router()
    .post("/customers/register", register)
    .post("/customers/login", login)
    .post("/customers/logout", logout)
// .get("/customers/authorize", authorize);

module.exports = { customerRouter };