import { About } from "../dbModels";

export default defineEventHandler(async (event: any) => {
    try {
        const { id, content } = await readBody(event);

        const about = await About.findOne({ _id: id });
        if (!about) {
            return {
                code: "ERROR",
                message: 'Failed to load data: About document not found',
            };
        }

        if (!content) {
            return {
                code: "ERROR",
                message: 'Failed to load data: Content is missing',
            };
        }

        about.content = content;

        await about.save();

        return {
            code: "SUCCESS",
            message: 'Data saved successfully',
        };
    } catch (error: any) {
        return {
            code: "ERROR",
            message: 'An error occurred while processing the request',
            error: error.message
        };
    }
});
