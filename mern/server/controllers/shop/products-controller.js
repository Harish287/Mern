
const Product = require("../../models/Product")

const getFilterProducts = async (req, res) => {
  try {

    const product = await Product

  } catch (e) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'some Error Occured',
    });
  }
};
