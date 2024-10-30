const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log("DB Connected")
})
.catch((err)=> {
    console.log(err.message);
})