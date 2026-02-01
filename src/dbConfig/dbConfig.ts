//we do connection here to mongodb using mongoose

import mongoose from "mongoose";

export async function connect(){
    try {
        // ! guarentees that value is not undefined
        //in typescript if process.env.MONGO_URL being undefined is not allowed ; extra security check
        mongoose.connect(process.env.MONGO_URL!)
        const connection=mongoose.connection

        connection.on('connected',()=>{
            console.log('db connected successfully')
        })
        connection.on('error',(err)=>{
            console.log('db connection failed',err)
            process.exit()
        })
      //  

    } catch (error) {
        console.log('something went wrong in connecting to db')
   console.log(error)
    }
}