import { Course } from '../../../dbModels'


export default defineEventHandler(async (event: any) => {
    const id: any = getRouterParam(event, 'id');
    const { title, description } = await readBody(event)
    const course: any = await Course.findOne({ _id: id })

    if (title) {
        course.title = title
    }
        if (description) {
        course.description = description
    }

    await course.save()
    return { 
        code : 'SUCCESS',
        message : 'บันทึกข้อมูลเรียบร้อย'
     }

});
