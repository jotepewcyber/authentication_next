'use client'
import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast/headless'
import { useRouter} from 'next/navigation'
function SignupPage() {
const router=useRouter()

    const [user,setUser]=useState({email:"",password:"",username:""})
    const [buttonDisabled,setButtonDisabled]=useState(false)
    const [loading,setLoading]=useState(false)


const onSignup=async()=>{
    try {
        setLoading(true)
        const response=await axios.post('/api/users/signup',user)
        console.log('Signup successful',response.data)
        router.push('/login')
//by pushing the home route remains same but this endpoint is appended at end


    } catch (error:any) {
        console.log('Signup failed',error)
        toast.error(error.message)
    }
}

useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.username.length>0){
        setButtonDisabled(false)
    }else{
        setButtonDisabled(true)
    }
},[user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-2xl font-bold mb-4'>{loading? "Signing up..." : "Signup"}</h1>
      <h2>Enter your username</h2>
        <input
        type="text"
        placeholder='Username'
        className='border p-2 mb-2 w-64'
        value={user.username}
        //if sb copy pasted 
        onChange={(e)=>{setUser({...user,username:e.target.value})}} />
<h2>Enter your email</h2>
         <input
        type="email"
        placeholder='Email'
        className='border p-2 mb-2 w-64'
        value={user.email}
        //if sb copy pasted 
        onChange={(e)=>{setUser({...user,email:e.target.value})}} />
       <h2>Enter your password</h2>
         <input
        type="password"
        placeholder='Password'
        className='border p-2 mb-2 w-64'
        value={user.password}
        //if sb copy pasted 
        onChange={(e)=>{setUser({...user,password:e.target.value})}} />
 
 
 <button onClick={onSignup} className='bg-blue-500 text-white px-4 py-2 rounded' disabled={buttonDisabled}>
    {buttonDisabled?"No signup":"Signup"}
 </button>
    </div>
  )
}

export default SignupPage
