import dotenv from 'dotenv'
import mongoose from 'mongoose'


dotenv.config()


const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('database is connected')
    }).catch(err=>{
        console.log('error while connecting')
    })
}
export default connectDB
