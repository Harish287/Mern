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

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) return res.json({
            success: false,
            message: " User doesn't exist Please Register First"
        })

        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password)

        if (!checkPasswordMatch) return res.json({
            success: false,
            message: " Invalid Password! please Try Again"
        })

        const token = jwt.sign({
            id: checkUser._id, role: checkUser.role, email: checkUser.email
        }, 'CLIENT_SECRET_KEY', { expiresIn: '60mins' })

        res.cookie('token', token, { httpOnly: true, secure: false }).json({
            success: true,
            message: 'logged in Successfully',
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,

            },
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred.",
        });
    }
};


//logout

const logoutUser = (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: ' Logged out successfully'
    })
}

//auth middleware


const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({
        success: false,
        message: "Unauthorised user!",
      });
  
    try {
      const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Unauthorised user!",
      });
    }
  };

module.exports = { registerUser, loginUser, logoutUser, authMiddleware}