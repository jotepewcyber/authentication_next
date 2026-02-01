import {NextRequest} from 'next/server'
import jwt from 'jsonwebtoken'
import User from '@/models/userModel';

//NextRequest implies its backend so request will come to it 
export const getDataFromToken=(request:NextRequest)=>{
    try {
        //when we created token we put 3 things to it---token,emailId,username
        //So from decoding token we get userId
        const token=request.cookies.get('token')?.value || ''
       const decodedToken:any= jwt.verify(token,process.env.TOKEN_SECRET!);
       
       return decodedToken.id



    } catch (error:any) {
        throw new Error(error.message)
    }
}