import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { getFullUser } from "../actions/users";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


export default async function AppLayout({children}: Readonly<{children: React.ReactNode}>) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const fullUser = await getFullUser(user.id)

  return (
    <>
      <Header/>
      <div className="flex flex-row ">
        <Sidebar username={fullUser?.username || ""}/>
        <main className="flex-1 mt-[65px] ml-64">
          {children}
        </main>
    </div>
</>
  );
}

