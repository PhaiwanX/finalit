import { Mail } from "../../dbModels";

export default defineEventHandler(async (event) => {
    try {
        const mails = await Mail.find().sort({ createdAt: -1 });

        return {
            code: "SUCCESS",
            message: "ดึงข้อมูลสำเร็จ",
            data: mails
        };
    } catch (error) {
        console.error("Error retrieving mails:", error);
        return {
            code: "ERROR",
            message: "เกิดข้อผิดพลาดในการดึงข้อมูล"
        };
    }
});
