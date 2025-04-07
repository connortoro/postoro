"use server"

import { getImageUrl, uploadImageToS3 } from "@/lib/aws";
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
                select: {likes: true, comments: true}
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

    posts.forEach(async (post) =>  {
        if(post.pic){
            post.pic = await getImageUrl(post.pic)
        }
        if(post.user && post.user.pic && !post.user.pic.startsWith("https://")) {
            post.user.pic = await getImageUrl(post.user.pic)
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
                select: {likes: true, comments: true}
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

    if(!post){
        return null
    }

    if(post.pic) {
        post.pic = await getImageUrl(post.pic)
    }

    if(post.user && post.user.pic && !post.user.pic.startsWith("https://")) {
        post.user.pic = await getImageUrl(post.user.pic)
    }


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
                select: {likes: true, comments: true}
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

    posts.forEach(async (post) =>  {
        if(post.pic){
            post.pic = await getImageUrl(post.pic)
        }
        if(post.user && post.user.pic && !post.user.pic.startsWith("https://")) {
            post.user.pic = await getImageUrl(post.user.pic)
        }
    })
    return posts
}


export async function addPost(formData: FormData) {

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

    const body = formData.get('body') as string;
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
    }

    await prisma.post.create( {
        data: {
            userId: user.id,
            body,
            pic: imageS3Key,
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
