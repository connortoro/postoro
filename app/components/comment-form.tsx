"use client"

import { useState } from "react"
import StatusIcon from "./status-icon"
import { addComment } from "../actions/comments"

type commentFormProps = {
  postId: number
}

export default function CommentForm({postId}: commentFormProps) {
  const [body, setBody] = useState("")

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await addComment(postId, body)
    setBody("")
  }

  return (
    <form onSubmit={(e) => {handleSubmit(e)}} className='flex flex-col items-center space-y-4 mb-[1.2rem]'>
      <textarea value={body} onChange={(e) => {setBody(e.target.value)}} placeholder="Add a Comment" className='focus:outline-none focus:ring-2 focus:ring-neutral-200 h-[5rem] w-[35rem] rounded-[12px] resize-none outline-1 outline-neutral-500 p-[.5rem] text-md' required maxLength={500}></textarea>
      <div className='flex flex-row items-center justify-center space-x-4'>
        <button type='submit' className='hover:cursor-pointer w-[4rem] h-[2rem] rounded-[10px] outline-1 outline-neutral-600'>Submit</button>
      </div>
    </form>
  )
}
