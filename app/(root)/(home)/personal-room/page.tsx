


// import React from 'react'

// const perosonalroom = () => {


//   return (
//     <section className='text-white flex flex-col size-full gap-10'>
//     <h1 className='text-3xl font-bold'>personal room</h1>

//     </section>
//   )
// }

// export default perosonalroom
'use client'
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react';

const Table=({title,description}:{title:string,description:string})=>(

  <div className='flex flex-col text-white gap-2'>
    <p>{title}</p>
    <p>{description}</p>
  </div>
)

const perosonalroom = () => {
  const router=useRouter()
const {user}=useUser()
const userId=user?.id
const {call}=useGetCallById(userId!)
const client=useStreamVideoClient()



const startRoom= async()=>{
  if(!client|| !user) return
  if(!call){
    const newCall=await client?.call('default',userId!)
    await newCall.getOrCreate({
      data: {
        starts_at: new Date().toISOString(),
      }
    });
    router.push(`/meeting/${userId}?personal='true'`)
  }
 
}

const meetingLink=`http://localhost:3000/meeting/${userId}`
  return (
    <section className='text-white flex flex-col size-full gap-10'>
     <h1 className='text-3xl font-bold'>personal room</h1> 
      <Table title="Topic" description={`${user?.username}'s meeting room`} />
      <Table title="Meeting Id" description={`${userId}`} />
      <Table title="Meeting Link" description={`${meetingLink}`} />
      <div className='flex flex-wrap gap-3'>
      <button  className="rounded-sm bg-blue-900 p-2" onClick={startRoom}>start meeting</button>
      <button className='rounded border p-2' onClick={()=>navigator.clipboard.writeText(meetingLink!)}>copy link</button>
      </div>
    
    </section>
  );
}

export default perosonalroom ;
