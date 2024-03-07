import mongoose, { Document } from "mongoose";
import bcrypt from "mongoose-bcrypt";

interface CourseSubject {
    code: string;
    name: string;
}

interface Course {
    title: string;
    subject: CourseSubject[];
}

interface courseDocument extends Document {
    title: string;
    description: string;
    course: Course[];
}

const courseSchema = new mongoose.Schema<courseDocument>(
    {
        title: String,
        description: String,
        course: [
            {
                title: String,
                subject: [
                    {
                        code: String,
                        name: String
                    }
                ]
            }
        ]
    },
    { timestamps: true, strict: true, strictQuery: true }
);

courseSchema.plugin(bcrypt);

export default mongoose.model<courseDocument>("Course", courseSchema, "courses");
