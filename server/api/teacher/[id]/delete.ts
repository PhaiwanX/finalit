import { Teacher } from '../../../dbModels';

export default defineEventHandler(async (event: any) => {
    const id: any = getRouterParam(event, 'id');
    try {
        await Teacher.deleteOne({ _id: id });
        return {
            code: "SUCCESS",
            message: 'ลบเรียบร้อย',
        };

    } catch (error) {
        return {
            code: "ERROR",
            message: 'ลบไม่ได้',
        };

    }
});
