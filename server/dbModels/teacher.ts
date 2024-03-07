import mongoose, { Document } from "mongoose";
import bcrypt from "mongoose-bcrypt";

interface UserDocument extends Document {
    name: string;
    position: string;
    image: string;
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
        name: String,
        position: String,
        image: String,
    },
    { timestamps: true, strict: true, strictQuery: true }
);

userSchema.plugin(bcrypt);

export default mongoose.model<UserDocument>("Teacher", userSchema, "teachers");
