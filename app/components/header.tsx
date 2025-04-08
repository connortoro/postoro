import { getKindeServerSession, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { getFullUser } from "../actions/users";

export default async function Header() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    const fullUser = await getFullUser(user.id)
    let imgSrc = user.picture
    if(fullUser){
        imgSrc = fullUser.pic
    }

    return (
        <header className="bg-neutral-950 z-50 fixed flex items-center top-0 border-b border-black/20 w-full h-[50px] text-[14px] text-center sm:px-[12rem] px-[2rem] pt-[2rem] pb-[2rem] border-b-neutral-800">
            <Link href="/">
                <div className="font-bold flex items-center gap-x-4 text-xl
                bg-gradient-to-r from-green-100 to-blue-200 bg-clip-text text-transparent">postoro</div>
            </Link>

            {fullUser &&
            <>
                <LogoutLink className="ml-auto">Logout</LogoutLink>
                <img src={imgSrc || ""} alt="pfp" width={40} height={40} className="ml-[1.5rem] rounded-full"></img>
            </>
            }
        </header>
    )
}
