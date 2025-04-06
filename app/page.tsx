import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Hero from "./components/hero";
export const dynamic = 'force-dynamic';

export default async function Home() {

  //Auth Check
  const { isAuthenticated } = getKindeServerSession()
  if(await isAuthenticated()) {
    redirect("/app/home")
  }

  return (
    <Hero/>
  );
}
