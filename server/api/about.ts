import { About } from "../dbModels";

export default defineEventHandler(async (event) => {

    const aboutData = await About.findOne();
    return {
        code: "ERROR",
        message: "โหลดข้อมูลสำเร็จ",
        data: aboutData
    };

});
