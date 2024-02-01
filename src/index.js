// const express = require('express');
// const app = express();
// const ejs = require('ejs');
// const userrouter = require('./routes/userroutes');
// const mongoose = require("mongoose");

// const port = process.env.PORT || 6000;

// app.use(express.json());
// app.use('/users', userrouter);

// mongoose.connect("mongodb://127.0.0.1:27017/userDatabase")


// .then(() => {
//         app.listen(port, () => {

//             console.log(`Server listening on port ${port}`);
//         });
//     })
//     .catch((error) => {
//         console.log(error)
//     });



const express = require('express');
const app = express();
const ejs = require('ejs');
const userrouter = require('./routes/userroutes');
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userrouter);

mongoose.connect("mongodb://127.0.0.1:27017/userDatabase")
    .then(() => {
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });