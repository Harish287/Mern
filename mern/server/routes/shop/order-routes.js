const express = require('express');

const {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
} = require('../../controllers/shop/order-controller.js');

const router = express.Router();

router.post('/create', createOrder);
router.post('/capture', capturePayment);
router.post('/list/:userId', getAllOrdersByUser);
router.post('/details/:id', getOrderDetails);

module.exports = router;
