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
    try {
        await News.deleteOne({ _id: id });
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
