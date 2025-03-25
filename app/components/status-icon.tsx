import React from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa6';

type StatusIconProps = {
  status: string;
}

export default function StatusIcon({ status }: StatusIconProps) {
  if (status === "success") {
    return(
      <FaCheck className='text-green-400 text-xl font-bold'/>
    )
  }

  if (status === 'failure') {
    return(
      <FaTimes className='text-red-400 text-2xl'/>
    )
  }

  if(status === 'loading') {
    return(
      <div className="animate-spin">
        <FaSpinner />
      </div>
    )
  }
}
