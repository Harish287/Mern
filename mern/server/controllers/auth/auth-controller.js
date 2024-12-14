const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");


// register

const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {

        const checkUser = await User.findOne({ email });
        if (checkUser) return res.json({
            success: false, message: " user Already Exist wuth this email! please try again"

        })

        const hashpassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName, email, password: hashpassword
        })
        await newUser.save();
        res.status(200).json({
            success: true,
            message: "Register successful"
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: "false",
            message: " some Error occured",
        });
    }
}

// Login

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
const checkUser = await User.findOne({email});
if (!checkUser) return res.json({
    success: false,
    message:" User doesn't exist Please Register First"
})

const checkPasswordMatch = await bcrypt.compare(password ,checkUser.password)

if (!checkPasswordMatch)return res.json({
    success: false,
    message:" Invalid Password! please Try Again"
})

 const token= jwt.sign({
    id:checkUser._id, role:checkUser.role ,email: checkUser.email
 } ,'CLIENT_SECRET_KEY',{expiresIn:'60mins'})

} catch (e) {
        console.log(e);
        req.status(500).json({
            success: "false",
            message: " some Error occured",
        });
    }
}

module.exports = { registerUser }