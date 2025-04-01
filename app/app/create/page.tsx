import React from 'react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import PostForm from '../../components/post-form'

export default async function Page() {
  // Auth Check
  const { isAuthenticated, getUser } = getKindeServerSession()
      if(!(await isAuthenticated())) {
        redirect("/")
      }

  return (
    <div className='flex flex-col items-center justify-center mr-[5rem]'>
      <h2 className='my-[2rem] text-xl font-bold'>Create post</h2>
      <PostForm/>
    </div>
  )
}
