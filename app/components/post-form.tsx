"use client";

import React from 'react'
import { useState } from 'react';
import { addPost } from '../actions/posts';
import StatusIcon from './status-icon';
import Link from 'next/link';

export default function PostForm() {

  const [body, setBody] = useState("")
  const [status, setStatus] = useState("")

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("loading")
    const res = await addPost(body)
    setStatus(res?.status)
    setBody("")
  }

  return (
    <form onSubmit={(e) => {handleSubmit(e)}} className='flex flex-col items-start space-y-4 mb-[1.2rem] ml-[20px]'>
      <textarea value={body} onChange={(e) => {setBody(e.target.value)}} className='focus:outline-none focus:ring-2 focus:ring-neutral-200 h-[15rem] w-[30rem] rounded-[12px] resize-none outline-1 outline-neutral-400 p-[.5rem]' required maxLength={500}></textarea>
      <div className='flex flex-row items-center justify-center space-x-4'>
        <button type='submit' className='hover:cursor-pointer w-[5rem] h-[2.3rem] rounded-[10px] outline-1 outline-neutral-400'>Submit</button>
        <StatusIcon status={status}/>
        { status === 'failure' && <p className='text-red-400'>Please Set Username in <Link href={'/settings'}><b className='text-lg'>Settings</b></Link></p>}
      </div>
    </form>
  )
}
