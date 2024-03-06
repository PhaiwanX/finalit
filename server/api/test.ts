export default defineEventHandler(async (event) => {
    return {
        data : process.env.SECRET_KEY
    }
});
