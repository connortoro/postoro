import { getKindeServerSession, LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {

  //Auth Check
  const { isAuthenticated } = getKindeServerSession()
  if(await isAuthenticated()) {
    redirect("/home")
  }


  return (
    <div className="mt-[100px] text-center">
      <div>Welcome!</div>
      <LoginLink>Login</LoginLink>
      <RegisterLink>Register</RegisterLink>
    </div>
  );
}
