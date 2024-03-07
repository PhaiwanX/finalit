import mongoose, { Document } from "mongoose";
import bcrypt from "mongoose-bcrypt";

interface UserDocument extends Document {
    title: string;
    content: string;
    image: string;
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
        title: String,
        content: String,
        image: String,
    },
    { timestamps: true, strict: true, strictQuery: true }
);

userSchema.plugin(bcrypt);

export default mongoose.model<UserDocument>("News", userSchema, "news");
