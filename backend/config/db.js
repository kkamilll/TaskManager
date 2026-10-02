const mongoose = require('mongoose');

const connectDB = async (retries = 3, delayMs = 5000) => {
    const mongoUri = process.env.MONGO_URI;
    const safeUri = mongoUri ? mongoUri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@') : 'UNDEFINED';
    console.log(`Attempting to connect to MongoDB (${safeUri})...`);

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            await mongoose.connect(mongoUri, {});
            console.log('MongoDB connected successfully');
            return;
        } catch (error) {
            console.error(`MongoDB connection attempt ${attempt}/${retries} failed:`, error.message);
            if (attempt < retries) {
                console.log(`Retrying in ${delayMs / 1000} seconds...`);
                await new Promise((res) => setTimeout(res, delayMs));
            } else {
                console.error('All MongoDB connection attempts failed. Exiting process.');
                process.exit(1);
            }
        }
    }
};

module.exports = connectDB;