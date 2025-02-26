const mongoose = require("mongoose");
const dotenv = require("dotenv");

// dotenv config
dotenv.config();

mongoose.connect(
    'mongodb://127.0.0.1:27017/mentors',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    },
    () => {
        console.log("Connected to Database");
    }
);
