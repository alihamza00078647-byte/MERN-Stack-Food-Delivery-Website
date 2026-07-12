const user = require('../Model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');


// Create Token using JWT
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
} 


// login user
const loginUser = async (req, res) => {
    try {
    const {email, password} = req.body;
        const User = await user.findOne({email});

        if (!User) {
            res.json({success: false, message: "Error! Please Sign in first"});
        }

        const isMatch = await bcrypt.compare(password, User.password);
        
        if (!isMatch) {
            res.json({success: false, message: "Enter Valid Password!"});
        }

        const token = createToken(User._id);
        
        res.json({success: true, token});
        
    } catch(error) {
        res.json({success: false, message: error.message});
    }
    
}


// Sign up or Register User.
const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    try {

        
        const userExists = await user.findOne({email});

    if (userExists) {
        return res.json({success: false, message: "User Already Exists"});
    }

    // Validate Email
    if (!validator.isEmail(email)) {
        return res.json({success: false, message: "Email is Not Valid"});
    }

    
    // Validate Password length
    if (password.length < 8) {
        return res.json({success: false, message: "Password Must Contains 8 Characters"})
    }

    // Hash User Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await user({name: name, email: email, password: hashedPassword});
    const User = await newUser.save();

    const token = createToken(User._id);

    res.json({success: true, token});

    } catch(error) {
        res.json({success: false, message: error.message});
    }
}

module.exports = {
    loginUser, registerUser
}