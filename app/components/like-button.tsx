"use client"

import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toggleLike } from '../actions/posts';
import { useState } from 'react';

type LikeButtonProps = {
  numLikes: number;
  liked: boolean;
  id: number;
};




export default function LikeButton(props: LikeButtonProps) {
  const [likeState, setLikeState] = useState(props.liked)
  async function handleClick(postId: number, e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setLikeState((curr)=> !curr)
    await toggleLike(postId)
  }

  return (
    <div onClick={(e) => {e.stopPropagation()
      e.preventDefault()
    }} className="flex items-center justify-center space-x-[1px]">
      <button onClick={(e) => handleClick(props.id, e)} className='hover:cursor-pointer text-lg p-[4px] hover:scale-[1.13] transition'>
        {likeState ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart />
        )}
      </button>
      <span>{props.numLikes}</span>
    </div>
  );
}
