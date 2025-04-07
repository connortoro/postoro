import React from 'react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import UsernameForm from '../../components/username-form'
import ProfilePictureForm from '@/app/components/pfp-form';
export const dynamic = 'force-dynamic';

export default async function Page() {
  // Auth Check
  const { isAuthenticated, getUser } = getKindeServerSession()
  if(!(await isAuthenticated())) {
    redirect("/")
  }
  const user = await getUser()
  if(!user) {
    redirect("/")
  }


  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='my-[2rem] text-xl font-bold'>Change Your Username</h2>
      <UsernameForm/>
      <h2 className='mb-[2rem] mt-[4rem] text-xl font-bold'>Change Your Profile Picture</h2>
      <ProfilePictureForm/>
    </div>
  )
}
