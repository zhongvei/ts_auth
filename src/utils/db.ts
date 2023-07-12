import mongoose from "mongoose";
import config from "config";
import log from "./logger";

async function connectToMongoDB() {

    const db = config.get<string>("mongoDBUrl");
    try {
        await mongoose.connect(db);
        log.info("Connected to MongoDB");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectToMongoDB;