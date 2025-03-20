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

    const posts = await prisma.post.findMany()
    return posts
}

export async function addPost(formdata: FormData) {

    // Auth Check
    const { isAuthenticated, getUser } = getKindeServerSession()
    if(!(await isAuthenticated())) {
        redirect("/api/auth/login")
    }

    const user = await getUser()

    const userId = user?.id || ""
    const title = formdata.get("title") as string;
    const body = formdata.get("body") as string;

    await prisma.post.create( {
        data: {
            userId,
            title,
            body
        }
    } )

    revalidatePath("/dashboard")
}
