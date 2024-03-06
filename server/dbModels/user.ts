import mongoose, { Document } from "mongoose";
import bcrypt from "mongoose-bcrypt";

interface UserDocument extends Document {
    username: string;
    email: string;
    u_password: string;
    name: string;
    lastname: string;
    position: string;
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        u_password: { type: String, required: true },
        name: String,
        lastname: String,
        position: String,
    },
    { timestamps: true, strict: true, strictQuery: true }
);

userSchema.plugin(bcrypt);

export default mongoose.model<UserDocument>("User", userSchema, "users");
