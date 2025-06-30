import { DB_NAME } from "../constants.js";
import mongoose, { connect } from "mongoose";

const connectDB = async (params) => {
    try {
        console.log(`${process.env.DATABASE_URI}/${DB_NAME}`)
        const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`)
        console.log(`\n Mongodb connected | DB Host: ${connectionInstance.connection.host}`)

    } catch (error) {
        console.log('MONGODB CONNECTION ERROR: '+error)
        process.exit(1)
    }
}

export default connectDB  