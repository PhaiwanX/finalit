import { Mail } from "../../dbModels";

export default defineEventHandler(async (event) => {
    try {
        const { email, title, content } = await readBody(event);

        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
        });

        const newMail = new Mail({
            email,
            title,
            date: currentDate,
            content,
            status: "New"
        });

        await newMail.save();

        console.log("Mail saved successfully");

        return {
            code: "SUCCESS",
            message: "ส่งอีเมลเรียบร้อยแล้ว"
        };
    } catch (error) {
        console.error("Error saving mail:", error);

        return {
            code: "ERROR",
            message: "เกิดข้อผิดพลาด"
        };
    }
});
