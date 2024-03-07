import { News } from "../../../dbModels";
export default defineEventHandler(async (event) => {
    const id: any = getRouterParam(event, 'id');

    try {
        const newsData = await News.findOne({ _id: id });
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