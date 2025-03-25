"use server"

import prisma from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAllPosts() {
    // Auth Check
    const { isAuthenticated, getUser } = getKindeServerSession()
        if(!(await isAuthenticated())) {
        redirect("/api/auth/login")
    }

    const posts = await prisma.post.findMany({
        include: {
            user: {
                select: {
                    username: true,
                    pic: true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return posts
}



export async function addPost(body: string) {

    // Auth Check
    const { isAuthenticated, getUser } = getKindeServerSession()
    if(!(await isAuthenticated())) {
        redirect("/api/auth/login")
    }

    const user = await getUser()
    if(!user) {
        return {
            status: "failure"
        }
    }

    const dbUser = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    })
    if(!dbUser) {
        return {
            status: "failure"
        }
    }


    await prisma.post.create( {
        data: {
            userId: user.id,
            body
        }
    } )

    return {
        status: "success"
    }
}
