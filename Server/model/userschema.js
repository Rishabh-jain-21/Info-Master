const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//defining user schema 
const useSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    Work: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
});
//this function says that it will run before 'save'(saving elements in server) in auth.js
useSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

useSchema.methods.generateAuthToken = async function () {
    try {
        let mytoken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: mytoken });
        await this.save();
        return token;
    }
    catch (err) {
        console.log(err);
    }
}

// connecting use schema with the server
//collection creating   
const User = mongoose.model('USER', useSchema);

module.exports = User;