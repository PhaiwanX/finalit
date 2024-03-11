import mongoose from "mongoose";
import bcrypt from "mongoose-bcrypt";
const schema = new mongoose.Schema(
    {
        email: String,
        title: String,
        date: String,
        content: String,
        status: String,
    },
    { timestamps: true, strict: true, strictQuery: true }
);
schema.plugin(bcrypt);
export default mongoose.model("Mail", schema, "mail");