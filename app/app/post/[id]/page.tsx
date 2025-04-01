import { getPostById } from "@/app/actions/posts"
import Post from "@/app/components/post"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"


type postPageProps = {
  params: {
    id: string
  }

}

export default async function PostPage( {params}: postPageProps ) {
  const { id } = await params
  const num_id = parseInt(id)

  // Auth check
  const { isAuthenticated } = getKindeServerSession()
  if(!(await isAuthenticated())) {
    redirect('/home')
  }

  const post = await getPostById(num_id)


  return (
    <div className='flex flex-col items-start justify-center ml-[8rem]'>
      {post ? <Post post={post}/>:
      <h2>Post Not Found</h2>}
    </div>
  )
}
