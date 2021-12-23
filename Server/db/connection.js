const mongoose = require('mongoose');
//taking secured variable from env file
const DB = process.env.DataBase;

// going to return a promise either fillfilled or rejected
mongoose.connect(DB).then(() => {
    console.log('connection successfull');
}).catch((e) => { console.log("error :", e) });