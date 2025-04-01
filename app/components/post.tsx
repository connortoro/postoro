import React from 'react';
import Image from 'next/image';
import { time_text } from '@/lib/utilities';
import { Post as PrismaPost, Like } from '@prisma/client';
import LikeButton from './like-button';
import Link from 'next/link';
import UserTag from './user-tag';

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

export default function Post({ post }: { post: PostWithUser }) {


  return (
    <Link href={`/app/post/${post.id}`} className='w-full space-y-3'>
    <div className='w-[35rem] min-h-[5rem] outline-1 outline-neutral-600 rounded-[10px] mt-[3rem] ml-[20px] text-wrap flex flex-col items-start justify-start p-[.5rem] px-[.7rem]'>
        <div className='flex flex-row items-center justify-between w-full mb-[.5rem]'>
          <UserTag pic={post.user.pic} username={post.user.username}/>
          <p className='text-neutral-400'>{time_text(post.createdAt)}</p>
        </div>

        <p className='break-words whitespace-normal mb-[.5rem] ml-[.2rem]'>{post.body}</p>
      
      <LikeButton id={post.id} numLikes={post._count.likes} liked={post.likes.length > 0}/>
    </div>
    </Link>
  );
}
