"use client"
import React, { useState } from 'react';
import MeetingCard from './MeetingCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactDatePicker from 'react-datepicker';
import { link } from 'fs';
const MeetingTypeList = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [callDetails, setCallDetails] = useState<Call | null>(null);
  const user = useUser();
  const client = useStreamVideoClient();

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: ""
  });

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error("Failed to create a call");

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description
          }
        }
      });

      setCallDetails(call);
      if(!values.description){
        router.push(`http://localhost:3000/meeting/${call.id}`);
      }
      
    } catch (error) {
      console.error(error);
      // Handle error by showing a toast or an alert
      toast({
        title: "Error",
        description: "Failed to create a meeting.",
        variant: "destructive",
      });
    }
  };

  const [meetingType, setMeetingType] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
const meetinglink=`localhost:3000/meeting/${callDetails?.id}`
  return (
    <section className='grid grid-cols-1 xs:grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 gap-4'>
      <MeetingCard
        title="New Meeting"
        description="start an instant meeting"
        handleclick={() => setMeetingType('isInstantMeeting')}
        isOpen={() => { }}
        isClose={() => { }}
        className="bg-orange-500"
      />
      <MeetingCard
        title="Schedule Meeting"
        description="plan your  meeting"
        handleclick={() => setMeetingType('isScheduleMeeting')}
        isOpen={''}
        isClose={() => { }}
        className="bg-blue-500"
      />

 <MeetingCard 
 title='join meeting'
 description='join via link'
 handleclick={()=>setMeetingType('isJoiningMeeting')}
    className='bg-blue-900'
    isOpen=""
   isClose=""

 />
      <MeetingCard
        title="Recordings"
        description="view recordings"
        handleclick={() => router.push('/recordings')}
        className="bg-red-500"
      />
         <MeetingModal
          isOpen={meetingType === 'isInstantMeeting'}
          isClose={() => setMeetingType(undefined)}
          title="start an instant meeitng"
          buttonText='start meeting'
          handleClick={createMeeting}
        />

      {!callDetails ? (
  
      <Dialog  open={meetingType=="isScheduleMeeting"} onOpenChange={()=>setMeetingType(undefined)} >
        <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white bg-gray-900">
        <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] ">
              Add a description
           </label>
           <Textarea
              className="border-none bg-dark-3 text-black  text-md font-bold focus-visible:ring-0 focus-visible:ring-offset-0"
              value={values.description}
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
            
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none text-black font-bold text-md"
            />
          </div>
          <button className='rounded border-none bg-blue-900 p-2 font-extrabold text-lg' onClick={createMeeting}>Schedule meeting</button>
        </DialogContent>
      </Dialog>

      ) : (
        <MeetingModal
          isOpen={meetingType === 'isScheduleMeeting'}
          isClose={() => setMeetingType(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetinglink);
            toast({ title: 'Link Copied' });
            setValues({...values,description:""})
          }}
          buttonText="Copy Meeting Link"
        />
      )}

   
     
    
     
        <MeetingModal
          isOpen={meetingType === 'isJoiningMeeting'}
          isClose={() => setMeetingType(undefined)}
          title="join via link "
          buttonText='join meeting'
          handleClick={()=>router.push(values.link)}
        >
          <Input type="text" className=' text-black text-md font-semibold border-none focus:ring-0 focus:ring-offset-0 focus:border-0 h-8 ' value={values.link} onChange={(e)=>setValues({...values,link:e.target.value})} />
        </MeetingModal>
      
    </section>
  );
};

export default MeetingTypeList;