"use client"
import React from 'react'

type ButtonsProps = {
  text:string,
  icon?: React.JSX.Element

}

const Button = ({text,icon}:ButtonsProps) => {
  return (
    <button className='flex gap-2 items-center  h-[40px] pl-[8px] pr-4 bg-purple-600 rounded-[20px]'>
      <div className="flex items-center gap-1">
          {icon}
          <p>{text}</p>
      </div>
    </button>
  )
}

export default Button