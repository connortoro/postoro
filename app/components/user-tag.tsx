"use client"

import Image from "next/image"
import { redirect } from 'next/navigation'

type UserTagProps = {
  username: string
  pic: string | null
}

export default function UserTag({username, pic} : UserTagProps) {

  const blank_pfp = 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg'

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    redirect(`/app/profile/${username}`)
  }

  return(
    <div onClick={(e) => handleClick(e)} className="flex flex-row items-center justify-center space-x-2">
      <Image src={pic || blank_pfp} height={30} width={30} alt="pfp" className='rounded-full'></Image>
      <h3 className='font-bold hover:underline'>{username}</h3>
    </div>
  )
}