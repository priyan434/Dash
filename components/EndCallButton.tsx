'use client'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React from 'react'

const EndCallButton = () => {
    const router=useRouter()
    const call=useCall()
    const {useLocalParticipant}=useCallStateHooks()
    const LocalParticipant=useLocalParticipant()
    const isMeetingOwner=LocalParticipant && call?.state.createdBy && LocalParticipant.userId==call?.state.createdBy.id
    if(!isMeetingOwner)return null

else{
    return (
        <button onClick={async()=>{
            await call.endCall();
            router.push('/')
        }}
        className='rounded bg-gray-800 p-2 '>
          End Call for everyone
        </button>
      )
}

}

export default EndCallButton
