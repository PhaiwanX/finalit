import { Teacher } from "../../dbModels";

export default defineEventHandler(async (event) => {

    const teacherData = await Teacher.find();
    if (!teacherData) {
        return {
            code: "ERROR",
            message: "โหลดข้อมูลไม่สำเร็จ",
        };
    }
    return {
        code: "ERROR",
        message: "โหลดข้อมูลสำเร็จ",
        data: teacherData
    };

});
