import React from 'react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { getAllPosts } from '../../actions/posts'
import Post from '../../components/post'
import { getFullUser } from '@/app/actions/users'

export default async function Page() {
  // Auth Check
  const { isAuthenticated, getUser } = getKindeServerSession()
      if(!(await isAuthenticated())) {
        redirect("/")
      }
  const user = await getUser()
  const fullUser = await getFullUser(user.id)
  if(!fullUser) {
    //TODO: handle username setting
    redirect("/app/settings")
  }
  const posts = await getAllPosts()

  return (
    <div className='flex flex-col items-center mb-[10rem]'>
      {posts?.map((post) => {
        return(
          <Post post={post} key={post.id}/>
        )
      })}
    </div>
  )
}
