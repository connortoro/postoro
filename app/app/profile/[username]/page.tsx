import { getPostsByUser } from "@/app/actions/posts"
import { getFullUserByUsername } from "@/app/actions/users"
import Post from "@/app/components/post"


type profilePageProps = {
  params: Promise<{username: string}>
}

export default async function Page({params}: profilePageProps) {
  const blank_pfp = 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg'
  const {username} = await params
  const fullUser = await getFullUserByUsername(username)
  if(!fullUser){
    return(
      <h1>User Doesn&apos;t exist</h1>
    )
  }
  const posts = await getPostsByUser(fullUser.id)

  return (
    <div className="flex flex-col items-center justify-center mb-[6rem]">
      <div className="w-full flex flex-row justify-start items-center px-[3rem] py-[1rem] space-x-8 border-b-1 border-neutral-800">
        <img src={fullUser?.pic || blank_pfp} alt="pfp"  className="h-[100px] w-[100] rounded-full object-cover"></img>
        <h2 className="text-3xl font-bold">{fullUser?.username}</h2>
      </div>
      {posts && posts.map((post) => {
        return(
          <Post post={post} key={post.id}/>
        )
      })}
    </div>
  )
}
