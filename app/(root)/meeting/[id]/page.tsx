'use client'
import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme, useStreamVideoClient } from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';

import React, { useState } from 'react'

const Meeting = ({ params:{id} }: { params: { id: string } }) => {
  const [isSetupComplete, setisSetupComplete] = useState(false);
  const {user,isLoaded}=useUser();
if(!isLoaded || !user) return <Loader/>
const {call,isCallLoading}=useGetCallById(id);


  return (
    <main className='h-screen w-full'>
      <StreamCall call={call} >
        <StreamTheme>
      {
        isSetupComplete?<MeetingRoom/>: <MeetingSetup setisSetupComplete={setisSetupComplete} />
      }
        </StreamTheme>
      </StreamCall> 
      
    </main>
  )
}

export default Meeting
