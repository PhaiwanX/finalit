// login.post.ts
import { createHash } from "crypto";
import jwt from "jsonwebtoken";
import { User } from "../dbModels/";
const config = useRuntimeConfig();

export default defineEventHandler(async (event: any) => {
    try {
        const { email, password } = await readBody(event);
        if (!email || !password) {
            throw new Error("Invalid email or password.");
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Incorrect email.");
        }

        const hashedPassword = hashPassword(password);

        if (hashedPassword !== user.u_password) {
            throw new Error("Incorrect password.");
        }

        const token = generateToken(user._id);

        return {
            code: "SUCCESS",
            message: "Login successful.",
            token
        };
    } catch (error) {
        return {
            code: "ERROR",
            message: error.message || "An unexpected error occurred."
        };
    }
});

function hashPassword(password: string): string {
    const salt = config.secret || '';
    return createHash('sha256')
        .update(password + salt)
        .digest('hex');
}

function generateToken(userId: string): string {
    const expiresIn = "1d";
    return jwt.sign({ userId }, config.secret || '', { expiresIn });
}
