import { Course } from "../../../../dbModels";

interface Term {
    no: number;
    title: string;
    subjects: Subjects[];
}

interface Subjects {
    name: string;
    code: string;
}

const findTermByNo = (jsonData: { term: Term[] }, no: number): Term | undefined => {
    return jsonData.term.find(term => term.no === no);
};

export default defineEventHandler(async (event) => {
    const id: any = getRouterParam(event, 'id');
    const term: any = getRouterParam(event, 'term');
    const data = await Course.findOne({ _id: id });
    const { courseData } = await readBody(event)
    if (!data) {
        return {
            code: "NOT_FOUND",
            message: "ไม่พบข้อมูล",
            data: null
        };
    }

    const dataJson: any = data.toJSON();

    data.term[(term - 1)].subjects = courseData.subjects
    await data.save()
    // const termWithNo1 = findTermByNo(dataJson, parseInt(term, 10));
    return {
        code: "SUCCESS",
        message: "บันทึกข้อมูลเรียบร้อย ",
    };
});
