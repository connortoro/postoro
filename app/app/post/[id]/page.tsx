import { getPostById } from "@/app/actions/posts"
import Post from "@/app/components/post"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import CommentForm from "@/app/components/comment-form"
import Comment from "@/app/components/comment"
import { getCommentsByPost } from "@/app/actions/comments"


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
  if(!post) {
    return(
      <div>Post Not Found</div>
    )
  }

  const comments = await getCommentsByPost(post.id)


  return (
    <div className='flex flex-col items-center justify-center mr-auto'>
      <div className="flex flex-col items-center justify-center space-y-4">
        <Post post={post}/>
        <CommentForm postId={post.id}/>
        <div className="h-[4rem] w-[3px] rounded-full"></div>
        {comments?.map((comment)=> {
          return(
            <Comment comment={comment} key={comment.id}/>
          )
        })}
      </div>
    </div>
  )
}
