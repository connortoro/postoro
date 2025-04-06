"use server"

import prisma from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from 'next/navigation'
import { User } from '@prisma/client'

export async function getFullUser(id: string): Promise<User| null> {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  return user
}

export async function getFullUserByUsername(username: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

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

  return users || [];
}
