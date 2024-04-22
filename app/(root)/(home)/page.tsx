// "use client"
import MeetingTypeList from "@/components/MeetingTypeList";
import { useState } from "react";



const Home = () => {
  const now = new Date();

  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);

  // const [meeting,setMeeting]=useState('undefined')

  return (
    <section className='text-white flex flex-col size-full p-0 gap-10 h-screen'>
    <h1 className='text-3xl font-bold '>home</h1>
    <div className='w-full   rounded-md   h-64 max-h-[276px] text-white flex flex-col justify-between p-4 bg-heroimg bg-cover bg-center bg-no-repeat '>
      <p className='bg-white/50 font-bold w-fit rounded-md p-1 '>upcoming meeting at 12:30pm</p>
      <div className=''>
        <h1 className='font-extrabold text-white text-4xl'>{time}</h1>
        <p className='font-bold text-white text-3xl'>{date}</p>
      </div> 
    </div>
    <div>
      <MeetingTypeList/>
    </div>
    </section>
  )
}

export default Home
