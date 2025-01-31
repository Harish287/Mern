const paypal = require('../../helpers/paypal.js');
const Order = require('../../models/Order.js');
const Cart = require('../../models/Cart.js');

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    const create_Payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: 'http://localhost:5173/shop/paypal-return',
        cancel_url: 'http://localhost:5173/shop/paypal-cancel',
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: 'USD',
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: 'USD',
            total: totalAmount.toFixed(2),
          },
          description: 'description',
        },
      ],
    };

    paypal.payment.create(create_Payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);

        return res.status(500).json({
          success: false,
          message: ' Error While Creating Paypal Payment',
        });
      } else {
        const newlyCrreatedOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });

        await newlyCrreatedOrder.save();

        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === 'approval_url',
        ).href;
        res.status(201).json({
          success: true,
          approvalURL,
          orderId: newlyCrreatedOrder._id,
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: 'false',
      message: 'Some Message Occures!',
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order Cannot be Found',
      });
    }

    order.paymentStatus = 'paid';
    order.orderStatus = 'confirmed';
    order.paymentId = paymentId;
    order.payerId = payerId;

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order Confirmed',
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: 'false',
      message: 'Some Message Occures!',
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: 'No Orders Found!',
      });
    }

    res.status(200).json({
      success: true,
      message: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: 'false',
      message: 'Some Message Occures!',
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { Id } = req.params;

    const order = await Order.findById(Id);

    if (!order) {
      return res.status(404).json({
        success: true,
        message: 'Orders Not Found!',
      });
    }

    res.status(200).json({
      success: true,
      message: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: 'false',
      message: 'Some Message Occures!',
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
