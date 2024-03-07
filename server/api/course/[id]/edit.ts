import { Course } from '../../../dbModels'


export default defineEventHandler(async (event: any) => {
    const id: any = getRouterParam(event, 'id');
    const courseData: any = await Course.findOne({ _id: id })
    return { courseData }
});
