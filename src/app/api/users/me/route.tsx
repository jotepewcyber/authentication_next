import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { error } from "console";
import {NextRequest,NextResponse} from 'next/server'
import { getDataFromToken } from "@/helpers/getDataFromToken";
connect()

export async function POST(request:NextRequest){
    try {
       const userId = await getDataFromToken(request)
       //database has _id field not id field
       const user=await User.findOne({_id:userId}).select('-password')


       //check if not user
       if(!user){
        return NextResponse.json({error:'User not found',status:404})
       }
         return NextResponse.json({user,status:200})
    } catch (error:any) {
        return NextResponse.json({error:error.message,status:500})
    }
}