"use server"

import prisma from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from 'next/navigation'
import { User } from '@prisma/client'
import { getImageUrl, uploadImageToS3 } from "@/lib/aws";

export async function getFullUser(id: string): Promise<User| null> {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if(user && user.pic && !user.pic.startsWith("https://")) {
    user.pic = await getImageUrl(user.pic)
  }

  return user
}

export async function getFullUserByUsername(username: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if(user && user.pic && !user.pic.startsWith("https://")) {
    user.pic = await getImageUrl(user.pic)
  }

  return user
}

export async function changeUsername(username: string) {
  const {isAuthenticated, getUser} = getKindeServerSession()
  if(!(await isAuthenticated())) {
    redirect("/api/auth/login")
  }

  username = username.toLowerCase()

  //username taken
  const existingUser = await prisma.user.findUnique({ where: {username: username} })
  if(existingUser) {
    return {
      status: 'failure'
    }
  }

  //username available
  const user = await getUser()
  const existingEntry = await prisma.user.findUnique({ where: {id: user.id} })
  if(existingEntry) {
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        username: username
      }
    })
  } else {
    await prisma.user.create({
      data: {
        id: user.id,
        username: username,
        pic: user.picture
      }
    })
  }

  return {
    status: 'success'
  }

}


export async function findUsersByUsername(searchString: string): Promise<User[]> {
  const users = await prisma.user.findMany({
    where: {
      username: {
        contains: searchString
      },
    },
  });

  for(const user of users) {
    if(user && user.pic && !user.pic.startsWith("https://")) {
      user.pic = await getImageUrl(user.pic)
    }
  }

  return users || [];
}

export async function changeProfilePicture(formData: FormData) {

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

  const fullUser = await getFullUser(user.id)
  if(!fullUser) {
    return {
      status: "failure"
    }
  }

  const file = formData.get('image') as File | null;
  let imageS3Key: string | null = null
  //Save to s3
  if(file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const contentType = file.type
      const res = await uploadImageToS3(buffer, contentType)
      console.log(res)
      if(res.success) {
          imageS3Key = res.fileKey
      }
  } else {
    return{
      status: 'failure'
    }
  }

  await prisma.user.update({
    where: {
      id: fullUser.id
    },
    data: {
      pic: imageS3Key
    }
  })

  return {
      status: "success"
  }
}