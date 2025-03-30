import { getKindeServerSession, LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import Hero from "./components/hero";

export default async function Home() {

  //Auth Check
  const { isAuthenticated } = getKindeServerSession()
  if(await isAuthenticated()) {
    redirect("/home")
  }

  return (
    <Hero/>
  );
}
