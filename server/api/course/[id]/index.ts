import { Course } from "../../../dbModels";

export default defineEventHandler(async (event) => {
    const id: any = getRouterParam(event, 'id');
    const data = await Course.findOne({ _id: id });

    // Check if data exists
    if (!data) {
        return {
            code: "NOT_FOUND",
            message: "ไม่พบข้อมูล",
            data: null
        };
    }

    const dataJson: any = data.toJSON();

    return {
        code: "SUCCESS",
        message: "โหลดข้อมูลสำเร็จ",
        data: dataJson
    };
});
