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
    <div className='w-[35rem] min-h-[5rem] outline-1 outline-neutral-400 rounded-[10px] mt-[3rem] text-wrap flex flex-col items-start justify-start p-[.5rem] px-[.7rem]'>
        <div className='flex flex-row items-center justify-between w-full mb-[.5rem]'>
          <UserTag pic={post.user.pic} username={post.user.username}/>
          <p className='text-neutral-400'>{time_text(post.createdAt)}</p>
        </div>
        <p className='break-words whitespace-normal mb-[.5rem] ml-[.2rem]'>{post.body}</p>
      <div className='flex flex-row space-x-4'>
        <LikeButton id={post.id} numLikes={post._count.likes} liked={post.likes.length > 0}/>
        <CommentButton numComments={post._count.comments}/>
      </div>
    </div>
    </Link>
  );
}
