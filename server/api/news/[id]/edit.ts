import { News } from '../../../dbModels'
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

interface FormDataItem {
    name: string;
    data: Buffer;
}


export default defineEventHandler(async (event: any) => {
    const id: any = getRouterParam(event, 'id');
    const formData: FormDataItem[] | any = await readMultipartFormData(event);
    try {
        if (!formData) {
            throw new Error("ไม่พบข้อมูล multipart form data");
        }

        const newsdata: any = await News.findOne({ _id: id });

        const title: string | undefined = formData.find((item: FormDataItem) => item.name === "title")?.data.toString();
        const content: string | undefined = formData.find((item: FormDataItem) => item.name === "content")?.data.toString();
        const image: FormDataItem | undefined = formData.find((item: FormDataItem) => item.name === "image");

        const dir_path = 'public/image';
        if (!fs.existsSync(dir_path)) {
            fs.mkdirSync(dir_path, { recursive: true });
        }

        if (image) {
            const imageFileName = `${uuidv4()}.png`;
            const imagePath = path.join(dir_path, imageFileName);
            fs.writeFileSync(imagePath, image.data);

            const imageNewPath = `/image/${imageFileName}`;
            newsdata.image = imageNewPath;
        }

        if (title) {
            newsdata.title = title;
        }

        if (content) {
            newsdata.content = content;
        }

        await newsdata.save();

        return {
            code: "SUCCESS",
            message: 'บันทึกข้อมูลเรียบร้อย',
        };

    } catch (error: any) {
        return {
            code: "ERROR",
            message: error.message,
        };
    }
});
