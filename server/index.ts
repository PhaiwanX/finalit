import mongoose from "mongoose";
const config = useRuntimeConfig();
export default async () => {
    try {
        await mongoose.connect(config.mongoUrl);
        console.log("[SUCCESS] Connected to Database.");
    } catch (err) {
        console.error("[SUCCESS] Fail to connect to Database : .", err);
    }
};