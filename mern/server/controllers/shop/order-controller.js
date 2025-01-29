const paypal = require('../../helpers/paypal.js');
const Order = require('../../models/Order.js');
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
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: 'false',
      message: 'Some Message Occures!',
    });
  }
};

module.exports = { createOrder, capturePayment };
