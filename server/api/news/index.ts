import { News } from "../../dbModels";
export default defineEventHandler(async (event) => {

    try {
        const newsData = await News.find();
        return {
            code: "SUCCESS",
            message: "โหลดข้อมูลสำเร็จ",
            data: newsData,
        };
    } catch (error) {
        return {
            code: "ERROR",
            message: "โหลดข้อมูลไม่สำเร็จ",
        };
    }
});