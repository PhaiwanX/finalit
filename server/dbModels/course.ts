import mongoose, { Document } from "mongoose";
import bcrypt from "mongoose-bcrypt";

interface CourseSubject {
    code: string | null;
    name: string;
}

interface Course {
    no: Number,
    title: string;
    subjects: CourseSubject[];
}

interface courseDocument extends Document {
    title: string;
    description: string;
    term: Course[];
}

const courseSchema = new mongoose.Schema<courseDocument>(
    {
        title: String,
        description: String,
        term: [
            {
                no: Number,
                title: String,
                subjects: [
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
