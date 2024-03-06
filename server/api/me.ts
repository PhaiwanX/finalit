import { User } from "../dbModels";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const { authorization } = event.req.headers;
    const token = authorization?.split(' ')[1];

    try {
        if (!token) {
            return {
                code: "ERROR",
                message: "ไม่พบ Token",
            };
        }

        const decoded = jwt.verify(token, `${process.env.SECRET_KEY}`);
        const userData = await User.findOne({ _id: decoded.userId }, { __v: 0, u_password: 0 });
        if (!userData) {
            return {
                code: "ERROR",
                message: "ไม่พบผู้ใช้ในระบบ",
            };
        }

        return {
            code: "SUCCESS",
            message: "ยืนยันตัวตนสำเร็จ",
            data: userData,
        };
    } catch (error) {
        return {
            code: "ERROR",
            message: "ไม่สามารถยืนยันตัวตนได้",
        };
    }
});
