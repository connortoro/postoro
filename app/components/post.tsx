import React from 'react';
import Image from 'next/image';
import { time_text } from '@/lib/utilities';
import { Post as PrismaPost } from '@prisma/client';
import { FaHeart } from 'react-icons/fa';

type PostWithUser = PrismaPost & {
  user: {
    username: string;
    pic: string | null
  }
};

const blank_pfp = 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg'

export default function Post({ post }: { post: PostWithUser }) {


  return (
    <div className='w-[35rem] min-h-[5rem] outline-1 outline-neutral-600 rounded-[10px] mt-[3rem] ml-[20px] text-wrap flex flex-col items-start justify-start p-[.5rem] space-y-3'>
      <div className='flex flex-row items-center justify-between w-full'>
        <div className='flex flex-row items-center justify-center space-x-2'>
          <Image src={post.user.pic || blank_pfp} height={30} width={30} alt="pfp" className='rounded-full'></Image>
          <h1 className='font-bold'><span className='text-neutral-400'>@</span>{post.user.username}</h1>
        </div>
        <p className='text-neutral-400'>{time_text(post.createdAt)}</p>
      </div>

      <p className='break-words whitespace-normal mb-[.8rem] ml-[.2rem]'>{post.body}</p>
      <button><FaHeart/></button>
    </div>
  );
}
