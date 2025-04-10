"use client"


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

  const colors: Record<string, string> = {
    'connor': 'bg-gradient-to-r from-blue-300 via-green-200 to-blue-300 bg-clip-text text-transparent text-shimmer',
    'sarahdenny': "text-blue-300",
    'izzyhickmet': "text-pink-300",
    'tesner': "text-purple-400"
  }

  return(
    <div onClick={(e) => handleClick(e)} className="flex flex-row items-center justify-center space-x-2 anima">
      <img src={pic || blank_pfp} alt="pfp" className="h-[30px] w-[30px] rounded-full object-cover"></img>
      <h3 className={'font-bold hover:underline hover:cursor-pointer ' + (colors[username] || 'text-white')}>{username}</h3>
    </div>
  )
}
