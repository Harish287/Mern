const express = require('express');

const {createOrder}= require("../../controllers/shop/order-controller.js")

const router =express.Router()

router.post('/create',createOrder);

module.exports= router