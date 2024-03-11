import { Mail } from "../../dbModels";

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id');

        const mail = await Mail.findOneAndUpdate(
            { _id: id },
            { status: "Read" },
            { new: true } 
        );

        if (mail) {
            return {
                code: "SUCCESS",
                message: "ดึงข้อมูลสำเร็จ",
                data: mail
            };
        } else {
            return {
                code: "NOT_FOUND",
                message: "ไม่พบข้อความในระบบ",
                data: null
            };
        }
    } catch (error) {
        console.error("Error fetching mail:", error);
        return {
            code: "ERROR",
            message: "เกิดข้อผิดพลาด"
        };
    }
});
