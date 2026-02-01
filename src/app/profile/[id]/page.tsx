'use client'

import React from 'react'

export default function page({params}:any) {
    const par:any=React.use(params)
    {console.log("params in profile id page tsx",par)}
    return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        
        <h1>Profile Page</h1>
      
        <h2 className='p-3 bg-green-500 rounded text-black'>hi{par.id}</h2>
        </div>
    )
  }

