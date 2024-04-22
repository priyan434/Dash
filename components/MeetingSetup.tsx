import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { Button } from './ui/button';

interface MeetingSetupProps {
  setisSetupComplete: (value: boolean) => void;
}

const MeetingSetup: React.FC<MeetingSetupProps> = ({ setisSetupComplete }) => {
  const [isMicToggledOn, setIsMicToggledOn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const call = useCall();

  useEffect(() => {
    if (call) {
      setIsLoading(false);
    }
  }, [call]);

  useEffect(() => {
    if (isMicToggledOn && call) {
      call?.camera?.disable();
      call?.microphone?.disable();
    } else if (!isMicToggledOn && call) {
      call?.camera?.enable();
      call?.microphone?.enable();
    }
  }, [isMicToggledOn, call, call?.camera, call?.microphone]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='flex h-screen w-full items-center flex-col justify-center text-white'>
        <h1 className='font-bold text-2xl'>
            setup
        </h1>
        <VideoPreview/>
        <div className='flex text-white items-center justify-center h-16 gap-4'>
            <label >
            <input type="checkbox"
             checked={isMicToggledOn} 
            onChange={(e)=>setIsMicToggledOn(e.target.checked)} />
            join with camera and mic off
            </label>
            <DeviceSettings/>
        </div>
      
        <Button className="text-lg bg-red-600 hover:bg-red-600 focus:ring-0 text-white"
        onClick={() => {
          if (call) {
            call.join();
            setisSetupComplete(true);
          }
        }}>
          join meeting
        </Button>
      
    </div>
  );
}

export default MeetingSetup;