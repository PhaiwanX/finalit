import mongoose, { Document } from "mongoose";
import bcrypt from "mongoose-bcrypt";

interface UserDocument extends Document {
    title: string;
    description: string;
    image: string;
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
        title: String,
        description: String,
        image: String,
    },
    { timestamps: true, strict: true, strictQuery: true }
);

userSchema.plugin(bcrypt);

export default mongoose.model<UserDocument>("Hero", userSchema, "hero");
