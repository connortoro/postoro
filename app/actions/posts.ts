"use server"

import prisma from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Post } from '@prisma/client'

export async function getAllPosts() {
    // Auth Check
    const { isAuthenticated, getUser } = getKindeServerSession()
        if(!(await isAuthenticated())) {
        redirect("/api/auth/login")
    }
    const user = await getUser()
    const currUserId = user.id

    const posts = await prisma.post.findMany({
        include: {
            user: {
                select: {
                    username: true,
                    pic: true,
                }
            },
            _count: {
                select: {likes: true}
            },
            likes: {
                where: {
                    userId: currUserId
                },
                select: {
                    userId: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return posts
}

export async function getPostById(id: number) {
    // Auth Check
    const { isAuthenticated, getUser } = getKindeServerSession()
    if(!(await isAuthenticated())) {
        redirect("/api/auth/login")
    }
    const user = await getUser()
    if(!user){
        return null
    }
    const currUserId = user.id

    const post = await prisma.post.findUnique({
        where: {
            id: id
        },
        include: {
            user: {
                select: {
                    username: true,
                    pic: true,
                }
            },
            _count: {
                select: {likes: true}
            },
            likes: {
                where: {
                    userId: currUserId
                },
                select: {
                    userId: true
                }
            }
        },
    })

    return post
}

export async function getPostsByUser(userId: string){
    const posts = await prisma.post.findMany({
        where: {
            userId
        },
        include: {
            user: {
                select: {
                    username: true,
                    pic: true,
                }
            },
            _count: {
                select: {likes: true}
            },
            likes: {
                where: {
                    userId
                },
                select: {
                    userId: true
                }
            }
        },
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

export async function toggleLike(postId: number) {
    // Auth Check
    const { isAuthenticated, getUser } = getKindeServerSession()
        if(!(await isAuthenticated())) {
        redirect("/api/auth/login")
    }
    const user = await getUser()
    const currUserId = user.id

    const existingLike = await prisma.like.findUnique({
        where: {
            userId_postId: {
                postId: postId,
                userId: currUserId
            }
        },
    })

    if(existingLike) {
        await prisma.like.delete({
            where: {
                userId_postId: {
                    postId: postId,
                    userId: currUserId
                }
            },
        })
    } else {
        await prisma.like.create({
            data: {
                userId: currUserId,
                postId: postId
            }
        })
    }
    revalidatePath('/home')
}
