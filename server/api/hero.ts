import { Hero } from "../dbModels";

export default defineEventHandler(async (event) => {

    const data = await Hero.find();

    return {
        code: "SUCCESS",
        message: "เรียกข้อมูลสำเร็จ",
        data
    };

});
