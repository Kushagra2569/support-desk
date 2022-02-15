const asyncHandler = require('express-async-handler')

// @desc    Register a new User
//@route    /api/users
//@access   Public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please provide all the required fields')
    }
    res.send('register route')
})

// @desc    Login a User
//@route    /api/users/login
//@access   Public
const loginUser = asyncHandler(async(req, res) => {
    res.send('login route')
})

module.exports = {
    registerUser,
    loginUser
}