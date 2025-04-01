import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getFullUser } from "@/app/actions/user";

export default async function Profile() {
  //Auth Check
  const { isAuthenticated, getUser } = getKindeServerSession()
  const user = await getUser() 
  const fullUser = await getFullUser(user.id)


  if(!(await isAuthenticated()) || !user || !fullUser) {
    redirect("/")
  }

  redirect(`/app/profile/${fullUser.username}`)

  return(
    <div>
      something really bad happened..
    </div>
  )

}