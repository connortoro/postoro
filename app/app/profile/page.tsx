import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getFullUser } from "@/app/actions/users";
export const dynamic = 'force-dynamic';

export default async function Profile() {
  //Auth Check
  const { isAuthenticated, getUser } = getKindeServerSession()
  if(!(await isAuthenticated()) ) {
    redirect("/")
  }

  const user = await getUser()
  if(!user) {
    redirect("/")
  }

  const fullUser = await getFullUser(user.id)
  if(!fullUser) {
    redirect("/")
  }

  if(fullUser) {
    redirect(`/app/profile/${fullUser.username}`)
  }


  return(
    <div>
      something really bad happened..
    </div>
  )

}
