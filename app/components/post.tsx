import { time_text } from '@/lib/utilities';
import { Post as PrismaPost } from '@prisma/client';
import LikeButton from './like-button';
import CommentButton from './comment-button';
import Link from 'next/link';
import UserTag from './user-tag';

type PostWithUser = PrismaPost & {
  user: {
    username: string;
    pic: string | null
  },
  _count: {
    likes: number;
    comments: number;
  },
  likes: {
    userId: string;
  }[]
};

export default function Post({ post }: { post: PostWithUser }) {

  return (

    <Link href={`/app/post/${post.id}`} className=' space-y-3'>
    <div className='w-[35rem] min-h-[5rem] outline-2 outline-neutral-500 rounded-[10px] mt-[3rem] text-wrap flex flex-col items-start justify-start p-[.7rem]'>
        <div className='flex flex-row items-center justify-between w-full mb-[.5rem]'>
          <UserTag pic={post.user.pic} username={post.user.username}/>
          <p className='text-neutral-400'>{time_text(post.createdAt)}</p>
        </div>
        <p className='break-words whitespace-pre-line mb-[.5rem] ml-[38px] w-[90%]'>{post.body}</p>
        {post.pic ? <img src={post.pic} height={450} width={450} alt='uploaded picture' className='ml-[42px] my-[1rem] rounded-[.7rem]'/> : <></>}
      <div className='flex flex-row space-x-4 ml-[36px]'>
        <LikeButton id={post.id} numLikes={post._count.likes} liked={post.likes.length > 0}/>
        <CommentButton numComments={post._count.comments}/>
      </div>
    </div>
    </Link>
  );
}
