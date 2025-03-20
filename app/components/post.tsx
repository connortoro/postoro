import React from 'react';
import { Post as PostType } from '@prisma/client'; 

type PostProps = {
  post: PostType;
};

export default function Post({ post }: PostProps) {
  return (
    <div className='w-[35rem] min-h-[10rem] outline-1 outline-neutral-500 rounded-[10px] mt-[3rem]'>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}
