import { getKindeServerSession, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function Header() {
    const {  getUser } = getKindeServerSession()
    const user = await getUser()

    return (
        <header className="bg-neutral-950 z-50 fixed flex items-center top-0 border-b border-black/20 w-full h-[50px] text-[14px] text-center px-[12rem] pt-[2rem] pb-[2rem] border-b-neutral-800">
            <Link href="/">
                <div className="font-bold flex items-center gap-x-4 text-xl
                bg-gradient-to-r from-green-100 to-blue-200 bg-clip-text text-transparent">postoro</div>
            </Link>

            {user &&
            <>
                <LogoutLink className="ml-auto">Logout</LogoutLink>
                <Image src={user?.picture || ""} alt="pfp" width={40} height={40} className="ml-[1.5rem] rounded-full"></Image>
            </>
            }
        </header>
    )
}
