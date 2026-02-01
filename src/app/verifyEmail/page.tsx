'use client'
import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
export default function verifyEmail() {
    const [token,setToken]=useState('')
    const [verified,setVerified]=useState(false)
    const [error,setError]=useState(false)
    const searchParams=useSearchParams()

    const verifyUserEmail=async()=>{
try {
  await axios.post('/api/users/verifyEmail',{token})
  setVerified(true)
  setError(false)
} catch (err:any) {
  setError(true)
  console.log(err.response.data)
}
    }

    //This will run only once when component loads
    useEffect(()=>{
      //1st way
//       const urlToken=window.location.search.split('=')[1]  //1 means 2nd element which wilbe tokenId
// setToken(urlToken||'')

setError(false)
//2nd way to get token
const tokenId=searchParams.get('token')
setToken(tokenId||'')
    },[])

    useEffect(()=>{
      setError(false)
      if(token.length>0){
        verifyUserEmail()
      }
    },[token])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className="text-4xl">Verify email</h1> 
      <h2 className='p-2 bg-orange-400 text-black'>
        {token?`${token}`:'No token found'}
      </h2>
      {verified && (
        <div>
          <h2>Verified successfully</h2>
          <Link href="/login" className="text-blue-500 underline">Go to Login</Link>
        </div>
      )}
    </div>
  )
}