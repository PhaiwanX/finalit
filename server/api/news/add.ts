import { News } from "../../dbModels";
export default defineEventHandler(async (event) => {
    try {
        const newNews = new News({
            title: "title",
            content: "content",
            image: null,
        });

        // Save the news object to the database
        await newNews.save();

        // Return a success response
        return {
            statusCode: 200,
            message: "เพิ่มข้อมูลสำเร็จ",
            data: newNews
        };
    } catch (error: any) {
        // Return an error response if something goes wrong
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to add news", details: error.message })
        };
    }
});
