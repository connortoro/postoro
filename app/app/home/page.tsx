import React from 'react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { getAllPosts } from '../../actions/posts'
import Post from '../../components/post'

export default async function Page() {
  // Auth Check
  const { isAuthenticated, getUser } = getKindeServerSession()
      if(!(await isAuthenticated())) {
        redirect("/")
      }
  const posts = await getAllPosts()

  return (
    <div className='flex flex-col items-center justify-center'>
      {posts?.map((post) => {
        return(
          <Post post={post} key={post.id}/>
        )
      })}
    </div>
  )
}
