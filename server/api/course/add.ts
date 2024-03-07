import { Course } from "../../dbModels";
export default defineEventHandler(async (event) => {
    try {
        const newCourse = new Course({
            title: 'เว็บ',
            description: "โครงสร้างหลักสูตรประกาศนียบัตรวิชาชีพ พุทธศักราช 2562 ประเภทวิชาเทคโนโลยีสารสนเทศและการสื่อสารสาขาวิชาเทคโนโลยีสารสนเทศ สาขางานการโปรแกรมคอมพิวเตอร์ เว็บ และอุปกรณ์เคลื่อนที่ รุ่นปีการศึกษา 2564-2566",
            course: [
                {
                    title: "ภาคเรียนที่ 1",
                    subject: [
                        {
                            code: "20000-1101",
                            name: "ภาษาไทยพื้นฐาน"
                        }
                    ]

                }
            ]
        });

        // Save the Course object to the database
        await newCourse.save();

        // Return a success response
        return {
            statusCode: 200,
            message: "เพิ่มข้อมูลสำเร็จ",
            data: newCourse
        };
    } catch (error: any) {
        // Return an error response if something goes wrong
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to add Course", details: error.message })
        };
    }
});
