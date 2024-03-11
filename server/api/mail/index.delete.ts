import { Mail } from "../../dbModels";

export default defineEventHandler(async (event) => {
    try {

        const { id } = await readBody(event);


        const deletedMail = await Mail.deleteOne({ _id: id });

        if (deletedMail.deletedCount === 1) {
            return {
                code: "SUCCESS",
                message: "ลบข้อความเรียบร้อยแล้ว"
            };
        } else {
            return {
                code: "NOT_FOUND",
                message: "ไม่พบข้อความในระบบ"
            };
        }
    } catch (error) {
        console.error("Error deleting mail:", error);


        return {
            code: "ERROR",
            message: "เกิดข้อผิดพลาด"
        };
    }
});
