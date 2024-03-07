import { Teacher } from "../../dbModels";

export default defineEventHandler(async (event) => {

    const id: any = getRouterParam(event, 'id');

    const teacherData = await Teacher.findOne({ _id: id });
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
