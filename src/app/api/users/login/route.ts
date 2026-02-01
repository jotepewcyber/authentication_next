import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { error } from "console";
import {NextRequest,NextResponse} from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
//import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

connect()

export async function POST(request:NextRequest){
try {
    const reqBody=await request.json()
    const {email,password}=reqBody
    //validation

console.log(reqBody);

const user=await User.findOne({email:email})

if(!user){
    return NextResponse.json({error:'User not found',status:400})
}

const validPassword=await bcrypt.compare(password,user.password)

if(!validPassword){
    return NextResponse.json({error:'Invalid password',status:400})
}

const tokendata={
    id:user._id,
    username:user.username,
    email:user.email
}

const token=jwt.sign(tokendata,process.env.TOKEN_SECRET!,{expiresIn:'1d'})

const response=NextResponse.json({message:'Logged in successfully','success':true})

response.cookies.set('token',token,{httpOnly:true})

return response

} catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
}
}

