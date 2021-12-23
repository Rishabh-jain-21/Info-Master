const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken")
const express = require("express");
const router = express.Router();
require("../db/connection");
const User = require("../model/userschema");

router.get('/', (req, res) => {
    res.send('hello duniya from router');
})

//registration route 
router.post('/register', async (req, res) => {
    //object destructuring
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(400).json({ 'error': 'Please fill all the requied feilds' });
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({ 'Warning': 'User with that email address already exists' });
        }

        const user = new User({ name, email, phone, work, password, cpassword });

        // here hashing called here before save function in userschema

        await user.save();
        res.status(201).json('User registered successfully');
    }
    catch (err) {
        console.log(err);
    }

});

// signin route
router.post('/signin', async (req, res) => {
    //destructuring
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "Please fill all the credentials" });
    }
    try {
        let token;
        //this function takes two arguments first one from server second from user
        const userExist = await User.findOne({ email: email });
        // console.log('console log', userExist);
        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials mail" });
        }
        else {

            //generating token in userschema.js file 
            token = await userExist.generateAuthToken();

            //adding token in cookie
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })

            const isMatch = await bcrypt.compare(password, userExist.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid Credentials pass" });
            }
            else {
                return res.status(200).json({ Congratulations: "Your are logged in successfully" });
            }
        }

    }
    catch (error) {
        console.log(error);
    }
});
module.exports = router;