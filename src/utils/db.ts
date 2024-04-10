const mongoose = require('mongoose');

export const connectDB = async () => {
    try {
        const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;
        
        await mongoose.connect(mongoConnectionString);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}