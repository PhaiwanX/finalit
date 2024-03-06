// register.post.ts
import { createHash } from "crypto";
import jwt from "jsonwebtoken";
import { User } from "../dbModels";

export default defineEventHandler(async (event) => {
    const { username, email, password, name, lastname } = await readBody(event);
    if (!username || !email || !password || !name || !lastname) {
        return {
            code: "ERROR",
            message: "Missing required fields."
        };
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return {
            code: "ERROR",
            message: "Username already exists.",
            existingUser
        };
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return {
            code: "ERROR",
            message: "Email already exists."
        };
    }

    const salt = process.env.SECRET_KEY || '';
    const hashPassword = createHash('sha256')
        .update(password + salt)
        .digest('hex');

    const user_role = "teacher";

    const newUser = new User({
        username,
        email,
        u_password: hashPassword,
        name,
        lastname,
        position: user_role
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY || '', {
        expiresIn: "1d",
    });

    return {
        code: "SUCCESS",
        message: "User account created successfully.",
        token
    };
});
