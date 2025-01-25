const Address = require('../../models/Address');

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).jaon({
        success: false,
        message: 'Invalid data provided!',
      });
    }

    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newlyCreatedAddress.save();

    res.status(200).json({
      status: true,
      message: newlyCreatedAddress,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: true,
      message: 'Error',
    });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).jaon({
        success: false,
        message: 'UserId id is required!',
      });
    }

    const addressList = await Address.findOne({ userId });
    res.status(200).json({
      success: true,
      data: addressList,
    });
    
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: true,
      message: 'Error',
    });
  }
};

const editAddress = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: true,
      message: 'Error',
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: true,
      message: 'Error',
    });
  }
};

module.exports = { addAddress, editAddress, fetchAllAddress, deleteAddress };
