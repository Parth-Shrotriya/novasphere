const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const{email, firstName, lastName, password} = req.body;

    try{
        let user = await User.findOne({email})

        if (user) {
            return res.status(400).json({
                success: false,
                message: "Please Login",
                data: null
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            email,
            firstName,
            lastName,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true, 
            message: "User Created Successfully", 
            data: null,
        });
    }catch(error){
        return res
        .status(500)
        .json({success: false,message: error.message,data: null});
    }
};

const login = async (req, res) => {
    const {email, password} = req.body;

    try{
        let user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Please Signup",
                data: null
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials",
                data: null
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role }, process.env.JWT_SECRET, 
            {
                expiresIn: '1d'
            }
        );

        return res.status(200).json({
            success: true,
            message: "User Logged In Successful",
            data: { token, user }
        });
    }catch(error){
        return res
        .status(500)
        .json({success: false,message: error.message,data: null});
    }
};

module.exports = { signup, login };