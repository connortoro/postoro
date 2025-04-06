"use client"

import { useEffect, useState } from "react"
import { findUsersByUsername } from "../../actions/users"
import { User } from '@prisma/client'
import UserTag from "@/app/components/user-tag"
export const dynamic = 'force-dynamic';


export default function Page() {
    const [searchText, setSearchText] = useState<string>("")
    const [results, setResults] = useState<User[]>([])

    useEffect(() => {
        async function setUsers(){
            const users = await findUsersByUsername(searchText.toLowerCase())
            setResults(users)
        }
        if (searchText.length < 2) {
            setResults([])
        } else {
            setUsers()
        }
    }, [searchText])


    return (
    <div className="flex flex-col justify-center items-center mt-[5rem] space-y-5">
        <h1 className="text-xl font-semibold">Search</h1>
        <input type='text' value={searchText} onChange={(e) => setSearchText(e.target.value)} className='w-[20rem] h-[2rem] px-[.6rem] outline-1 outline-neutral-500 rounded-md mb-[5rem]'></input>
            {results.map((result) => {
                return(
                    <div key={result.id} className="flex flex-row w-[20rem] h-[3rem] rounded-md outline-1 outline-neutral-500 px-4">
                        <UserTag username={result.username} pic={result.pic}/>
                    </div>
                )
            })}
    </div>
    )
}
