"use server"

import { getImageUrl, uploadImageToS3 } from "@/lib/aws";
import prisma from "@/lib/prisma"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const approvedUsers = [
    "kp_0c038619dd374e78acef3d6edac3ec44",
    "kp_8ee0277df324429ca8d2b372004af55d",
    "kp_93ef4aafe5354bec87bd26bd78fe9bee",
    "kp_a01b9bd4e7484cbb996cb5c36ed37b67",
    "kp_b329e6c774854ad3a9a5f2c633e1d919",
    "kp_d16ff9f450af403b9e0f0ad409f8b57c",
    "kp_d6cb556b948d48389a7ae1b9a1247a52",
    "kp_f32d1d5d7a6e4d219b4974a5fa4f0ba2",
    "kp_ffb586da006c466e94a336df9887aefd"
]

function isApproved(id: string) {
    for (const approvedUser of approvedUsers) {
        if (id === approvedUser) {
            return true
        }
    }
    return false
}

export async function getAllPosts() {
    // Auth Check
    const { isAuthenticated, getUser } = getKindeServerSession()
        if(!(await isAuthenticated())) {
        redirect("/api/auth/login")
    }
    const user = await getUser()
    const currUserId = user.id
    if(!isApproved(currUserId)) {
        return null
    }

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
    if(!isApproved(currUserId)) {
        return null
    }

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
    if(!isApproved(currUserId)) {
        return null
    }

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
        orderBy:{
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
