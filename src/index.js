import 'dotenv/config'
import connectDB from "./db/index.js";

// const app = express()
connectDB()

























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