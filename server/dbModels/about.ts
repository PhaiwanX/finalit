import mongoose, { Document } from "mongoose";
import bcrypt from "mongoose-bcrypt";

interface UserDocument extends Document {
    content: string;
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
        content: String,
    },
    { timestamps: true, strict: true, strictQuery: true }
);

userSchema.plugin(bcrypt);

export default mongoose.model<UserDocument>("About", userSchema, "about");
