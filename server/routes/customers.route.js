const express = require("express");
const { register, login, logout, authorize } = require("../controllers/customers.controller");
const jwt = require('jsonwebtoken');


const customerRouter = express
    .Router()
    .post("/customers/register", register)
    .post("/customers/login", login)
    .post("/customers/logout", logout)
    .get('/customers/status', authorize);

module.exports = { customerRouter };