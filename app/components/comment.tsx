import { time_text } from '@/lib/utilities';
import LikeButton from './like-button';
import CommentButton from './comment-button';
import Link from 'next/link';
import UserTag from './user-tag';

type commentProps = {
  user: {
    pic: string | null;
    username: string;
  };
  } & {
  id: number;
  body: string;
  userId: string;
  postId: number;
  createdAt: Date;
}


export default function Comment({ comment }: { comment: commentProps }) {


  return (
    <div className='w-[35rem] min-h-[5rem]  rounded-[10px] text-wrap flex flex-col items-start justify-start py-[.7rem] px-[.7rem] outline-1 outline-neutral-700'>
        <div className='flex flex-row items-center justify-between w-full mb-[.5rem]'>
          <UserTag pic={comment.user.pic} username={comment.user.username}/>
          <p className='text-neutral-400'>{time_text(comment.createdAt)}</p>
        </div>
        <p className='break-words whitespace-normal mb-[.5rem] ml-[40px]'>{comment.body}</p>
      <div className='flex flex-row space-x-4'>
        {/* <LikeButton id={post.id} numLikes={post._count.likes} liked={post.likes.length > 0}/> */}
      </div>
    </div>
  );
}
