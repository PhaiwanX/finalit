import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Teacher } from '../../../dbModels';

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

        const teacher: any = await Teacher.findOne({ _id: id });

        const name: string | undefined = formData.find((item: FormDataItem) => item.name === "name")?.data.toString();
        const position: string | undefined = formData.find((item: FormDataItem) => item.name === "position")?.data.toString();
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
            teacher.image = imageNewPath;
        }

        if (name) {
            teacher.name = name;
        }

        if (position) {
            teacher.position = position;
        }

        await teacher.save();

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
