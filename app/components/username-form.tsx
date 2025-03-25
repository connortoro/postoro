"use client"

import React, { useEffect } from 'react';
import { useState } from 'react';
import { changeUsername } from '../actions/user';
import StatusIcon from './status-icon';

export default function UsernameForm() {

  const [username, setUsername] = useState("")
  const [status, setStatus] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading")

    const res = await changeUsername(username)
    setTimeout(() => {
      setStatus(res?.status)
    }, 400);
  }

  useEffect(() => {
    if(username === ""){
      setStatus("")
      return
    }
    if (!(isValidUsername(username))){
      setStatus("invalid")
    } else {
      setStatus("")
    }
  },
  [username])


  function isValidUsername(username: string) {
    const isNotEmpty = username && username.trim() !== '';
    const hasValidLength = username.length >= 3 && username.length <= 18;
    const hasValidChars = /^[a-zA-Z0-9_]+$/.test(username);
    const doesntStartWithNumber = !/^[0-9]/.test(username);

    return isNotEmpty && hasValidLength && hasValidChars && doesntStartWithNumber;
  }

  function buttonClass(): string {
    if(status === 'invalid') {
      return 'text-neutral-600'
    } else {
      return 'text-neutral-50 hover:cursor-pointer'
    }
  }
  return (
    <div className='ml-[3rem]'>
      <form onSubmit={handleSubmit} className='flex flex-col items-start space-y-4 mb-[1.2rem]'>
        <div className='flex flex-row items-center justify-center space-x-3'>
          <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} required className='outline-1 outline-neutral-300 rounded-[6px] h-[2.3rem] w-[16rem] px-[10px]'/>
          <div className="w-6 h-6 flex items-center justify-center">
            {status && <StatusIcon status={status}/>}
          </div>
        </div>
        <button type='submit' className={' w-[5rem] h-[2.3rem] rounded-[10px] outline-1 outline-neutral-300' + ' ' + buttonClass()} disabled={status === 'invalid' || status === 'loading'}>Submit</button>
      </form>
      {status === "invalid" && (
        <div className='text-red-400'>Invalid Username</div>
      )}
      {status === 'failure' && (
        <div className='text-red-400'>Username Taken</div>
      )}
    </div>
  );
}
