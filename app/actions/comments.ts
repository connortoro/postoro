"use server"

import prisma from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getImageUrl } from "@/lib/aws";

export async function addComment(postId: number, body: string){
  const { isAuthenticated, getUser } = await getKindeServerSession()
  if(!(await isAuthenticated())) {
    return {
      status: "failure"
    }
  }
  const user = await getUser()
  if(!user) {
    return {
      status: "failure"
    }
  }

  await prisma.comment.create({data: {
    userId: user.id,
    postId,
    body
  }})

  revalidatePath(`/post/${postId}`)

  return {
    status: "success"
  }
}

export async function getCommentsByPost(postId: number){
  const { isAuthenticated } = await getKindeServerSession()
  if(!(await isAuthenticated())) {
    redirect("/api/auth/login")
  }

  const comments = await prisma.comment.findMany({
    where: {
      postId
    },
    include: {
      user: {
        select: {username: true, pic: true}
      }
    },
    orderBy: {
      createdAt: 'desc'
  }
  })

  for(const comment of comments) {

    if(comment.user && comment.user.pic && !comment.user.pic.startsWith("https://")) {
      comment.user.pic = await getImageUrl(comment.user.pic)
      }
  }

  return comments
}
