"use client"

import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toggleLike } from '../actions/posts';

type LikeButtonProps = {
  numLikes: number;
  liked: boolean;
  id: number;
};

async function handleClick(postId: number, e: React.MouseEvent) {
  e.preventDefault()
  e.stopPropagation()
  await toggleLike(postId)
}

export default function LikeButton(props: LikeButtonProps) {

  return (
    <div onClick={(e) => {e.stopPropagation()
      e.preventDefault()
    }} className="flex items-center justify-center space-x-[1px]">
      <button onClick={(e) => handleClick(props.id, e)} className='hover:cursor-pointer text-lg p-[4px] hover:scale-[1.13] transition'>
        {props.liked ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart />
        )}
      </button>
      <span>{props.numLikes}</span>
    </div>
  );
}
