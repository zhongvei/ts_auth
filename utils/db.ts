import mongoose from "mongoose";
import config from "config";

async function connectToMongoDB() {

    const db = config.get<string>("db");
    try {
        await mongoose.connect(db);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectToMongoDB;