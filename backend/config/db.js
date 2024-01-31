import mongoose from "mongoose";
import orderModel from '../models/oderModel.js'
import userModel from '../models/userModel.js'
import productModel from '../models/productModel.js'

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${ conn.connection.host}`.cyan.underline)
        await orderModel.createIndexes()
        await userModel.createIndexes()
        await productModel.createIndexes()
        
    } catch(error){
         console.log(`Error:${error.message}`.red.underline.bold)
         process.exit(1)
    }
}

export default connectDB