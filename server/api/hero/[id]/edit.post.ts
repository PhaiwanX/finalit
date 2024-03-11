import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Hero } from "../../../dbModels";

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

        const hero = await Hero.findOne({ _id: id });

        const title: string | undefined = formData.find((item: FormDataItem) => item.name === "title")?.data.toString();
        const description: string | undefined = formData.find((item: FormDataItem) => item.name === "description")?.data.toString();
        const image: FormDataItem | undefined = formData.find((item: FormDataItem) => item.name === "image");

        const dir_path = 'public/image'
        if (!fs.existsSync(dir_path)) {
            fs.mkdirSync(dir_path, { recursive: true });
        }

        if (image) {
            const imageFileName = `${uuidv4()}.png`; // Generate a unique filename
            const imagePath = path.join(dir_path, imageFileName);
            fs.writeFileSync(imagePath, image.data); // Save the image to the specified directory

            const imagenewPath = `/image/${imageFileName}`;
            hero.image = imagenewPath;
        }
        if (title) {
            hero.title = title;

        }
        if (description) {
            hero.description = description;

        }
        await hero.save();
        return {
            code: "SUCCESS",
            message: 'บันทึกข้อมูบเรียบร้อย',
        };


    } catch (error: any) {
        return {
            code: "ERROR",
            message: error.message,
        };
    }
});
function uuid4() {
    throw new Error("Function not implemented.");
}

