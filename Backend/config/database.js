import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { fileURLToPath } from 'node:url'


dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) })


const connectDB = async ()=>{
    if (!process.env.MONGO_URL?.trim()) {
        throw new Error('MONGO_URL is missing. Configure it in Backend/.env.')
    }
    await mongoose.connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 10000 })
    console.log('database is connected')
}
export default connectDB
