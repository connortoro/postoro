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

  const color = username == 'connor' ? 'bg-gradient-to-r from-green-200 to-blue-200 bg-clip-text text-transparent' : 'text-white'

  return(
    <div onClick={(e) => handleClick(e)} className="flex flex-row items-center justify-center space-x-2">
      <img src={pic || blank_pfp} height={30} width={30} alt="pfp" className='rounded-full'></img>
      <h3 className={'font-bold hover:underline hover:cursor-pointer ' + color}>{username}</h3>
    </div>
  )
}
