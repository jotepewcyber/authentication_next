'use client'
import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast/headless'
import { useRouter} from 'next/navigation'
import Link from 'next/link'
import SignupPage from '../signup/page'
function LoginPage() {
const router=useRouter()

    const [user,setUser]=useState({email:"",password:""})
    const [buttonDisabled,setButtonDisabled]=useState(false)
    const [loading,setLoading]=useState(false)


const onLogin=async()=>{
    try {
        setLoading(true)
        const response=await axios.post('/api/users/login',user)
        console.log('Login successful',response.data)
        router.push('/profile')
//by pushing the home route remains same but this endpoint is appended at end


    } catch (error:any) {
        console.log('Login failed',error)
        toast.error(error.message)
    }
}

useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 ){
        setButtonDisabled(false)
    }else{
        setButtonDisabled(true)
    }
},[user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-2xl font-bold mb-4'>{loading? "Logging in..." : "Login"}</h1>
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
 
 
 <button onClick={onLogin} className='bg-blue-500 text-white px-4 py-2 rounded' disabled={buttonDisabled}>
    {buttonDisabled?"No login":"Login"}
 </button>
 <Link href='/signup' className='mt-4 text-blue-500 underline'>Go to Signup</Link>
    </div>
  )
}

export default LoginPage
