import 'dotenv/config'
import connectDB from "./db/index.js"
import app from "./app.js";

// const app = express()
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
});

























/*
;( async () => {
    try {
        await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`)
        app.on('error', (err)=>{
            console.error('Err:', err)
            process.exit(1)
        })   

        app.listen(process.env.PORT, () => {
            console.log('the server is listening...')
        })
    } catch (error) {
        console.error(error)
        throw error;
    }
} )();
*/