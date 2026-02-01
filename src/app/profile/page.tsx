'use client'
import React from 'react'
import axios from 'axios'
import toast from 'react-hot-toast/headless'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { error } from 'console'


export default function ProfilePage() {
    const router=useRouter()
    const [data,setData] = useState('nothing')

    const getUserDetails=async()=>{
     try {
          const response = await axios.post('/api/users/me')
          console.log("response data is || Better say user details are", response.data.user)
          setData(response.data.user._id);
     } catch (error) {   
        console.log('error in line 20 profile frontend',error)
     }
    }

    const logout=async()=>{
     try {
          const res= await axios.get('/api/users/logout')
            toast.success('Logged out successfully')
            router.push('/login')
     } catch (error) {
        console.log(error)
        toast.error('Error logging out')
     }
    }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
     <h1 className='text-2xl'>Profile Page</h1>
     <h2>{data === 'nothing' ? 'No user data':<Link href={`/profile/${data}`}>{data}</Link>}</h2>
     
     <hr />
<button onClick={logout} className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Logout</button>
<button onClick={getUserDetails} className='bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Get user Details</button>
    </div>
  )
} 