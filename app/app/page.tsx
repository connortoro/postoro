import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {redirect} from 'next/navigation'

export default async function AppPage() {

  //Auth Check
  const { isAuthenticated } = getKindeServerSession()
  if(await isAuthenticated()) {
    redirect("/app/home")
  }

  return (
    <></>
  );
}