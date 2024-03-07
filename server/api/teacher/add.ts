import { Teacher } from '../../dbModels';

export default defineEventHandler(async (event: any) => {
    try {

        const newTeacher = new Teacher({
            name: 'John Doe',
            position: 'dontknow',
            image: ''
        });

        await newTeacher.save();

        return {
            code: "SUCCESS",
            message: 'Teacher added successfully',
            data: newTeacher
        };
    } catch (error: any) {
        return {
            code: "ERROR",
            message: error.message || 'An error occurred while adding the teacher'
        };
    }
});
