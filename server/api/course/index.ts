import { Course } from "../../dbModels";

export default defineEventHandler(async (event) => {

    const courseData = await Course.find();
    return {
        code: "SUCCESS",
        message: "โหลดข้อมูลสำเร็จ",
        data: courseData
    };

});
