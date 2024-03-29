const express = require('express');
const app = express();
const userrouter = require('./routes/userroutes');
const mongoose = require("mongoose");
require("dotenv").config()
const port=process.env.port


// const port = 3000;

app.use(express.json());

app.use('/users', userrouter);

mongoose.connect("mongodb://127.0.0.1:27017/userDatabase")
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
