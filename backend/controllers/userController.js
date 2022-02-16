const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

const User = require('../models/userModel') 
// @desc    Register a new User
//@route    /api/users
//@access   Public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please provide all the required fields')
    }

    // Find if the user already exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create a new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    }
        else {
            res.status(400)
            throw new error('Invalid user data')
        }
})

// @desc    Login a User
//@route    /api/users/login
//@access   Public
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email})

    //Check if the user exists and passwords match
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

module.exports = {
    registerUser,
    loginUser
}