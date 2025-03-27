const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config(); 

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/mentors', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false, 
           
        });
        console.log(" Connected to MongoDB successfully!");
    } catch (error) {
        console.error(" MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
