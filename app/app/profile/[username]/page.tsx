import { getPostsByUser } from "@/app/actions/posts"
import { getFullUserByUsername } from "@/app/actions/user"
import Post from "@/app/components/post"
import Image from "next/image"


type profilePageProps = {
  params: {
    username: string
  }
}

export default async function Page({params}: profilePageProps) {
  const blank_pfp = 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg'
  const {username} = await params
  const fullUser = await getFullUserByUsername(username)
  if(!fullUser){
    return(
      <h1>User Doesn't exist</h1>
    )
  }
  const posts = await getPostsByUser(fullUser.id)

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full flex flex-row justify-start items-center px-[3rem] py-[1rem] space-x-8 border-b-1 border-neutral-800">
        <Image src={fullUser?.pic || blank_pfp} height={100} width={100} alt="pfp"  className="rounded-full"></Image>
        <h2 className="text-3xl font-bold">{fullUser?.username}</h2>
      </div>
      {posts.map((post) => {
        return(
          <Post post={post} key={post.id}/>
        )
      })}
    </div>
  )
}
