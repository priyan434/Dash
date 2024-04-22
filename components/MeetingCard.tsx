import { cn } from '@/lib/utils'
import React from 'react'
interface MeetingProps{
    title:string,
    description:string,
    handleclick?:()=>void,
    className:string,
    isOpen?:any,
    isClose?:any,
}
const MeetingCard = ({title,description,handleclick,isOpen,isClose,className}:MeetingProps) => {
  return (

    <>
       <div className={cn('min-h-[267px] p-4 text-white text-xl rounded-md bg-orange-500 flex flex-col justify-between cursor-pointer',className)}
        onClick={handleclick}>
            
            <div>icon</div>
            <div className='flex flex-col gap-2'>
                <h2 className='text-2xl font-bold'>{title}</h2>
                <p className='text-lg' >{description}</p>
            </div>
        </div>
    </>
  )
}

export default MeetingCard
