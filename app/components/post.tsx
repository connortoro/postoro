import React from 'react';
import Image from 'next/image';
import { time_text } from '@/lib/utilities';
import { Post as PrismaPost, Like } from '@prisma/client';
import LikeButton from './like-button';
import Link from 'next/link';
import { FaMessage } from 'react-icons/fa6';

type PostWithUser = PrismaPost & {
  user: {
    username: string;
    pic: string | null
  },
  _count: {
    likes: number
  },
  likes: {
    userId: string
  }[]
};

const blank_pfp = 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg'

export default function Post({ post }: { post: PostWithUser }) {


  return (
    <div className='w-[35rem] min-h-[5rem] outline-1 outline-neutral-600 rounded-[10px] mt-[3rem] ml-[20px] text-wrap flex flex-col items-start justify-start p-[.5rem] px-[.7rem]'>
      <Link href={`/post/${post.id}`} className='w-full space-y-3'>
        <div className='flex flex-row items-center justify-between w-full'>
          <div className='flex flex-row items-center justify-center space-x-2'>
            <Image src={post.user.pic || blank_pfp} height={30} width={30} alt="pfp" className='rounded-full'></Image>
            <h1 className='font-bold'><span className='text-neutral-400'>@</span>{post.user.username}</h1>
          </div>
          <p className='text-neutral-400'>{time_text(post.createdAt)}</p>
        </div>

        <p className='break-words whitespace-normal mb-[.8rem] ml-[.2rem]'>{post.body}</p>
      </Link>
      <LikeButton id={post.id} numLikes={post._count.likes} liked={post.likes.length > 0}/>
    </div>
  );
}
