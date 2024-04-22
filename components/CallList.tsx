// "use client"
// import { useGetCalls } from "@/hooks/useGetCalls";
// import Loader from "./Loader";
// import MeetingCard2 from "./MeetingCard2";
// import { Call, CallRecording } from "@stream-io/video-react-sdk";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recording' }) => {
//     const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
//     const [recordings, setRecordings] = useState<CallRecording[]>();
//   const router=useRouter()
//     if (isLoading) return <Loader />;
  
//     const callTypes = () => {
//       switch (type) {
//         case "ended":
//           return endedCalls;
//         case "upcoming":
//           return upcomingCalls;
//         case "recording":
//           return callRecordings;
//         default:
//           return [];
//       }
//     };
  
//     const getNoCallsMessage = () => {
//       switch (type) {
//         case "ended":
//           return "No previous calls";
//         case "upcoming":
//           return "No upcoming calls";
//         case "recording":
//           return "No recordings";
//         default:
//           return "";
//       }
//     };
// useEffect(()=>{
// const fetchrecordings=async()=>{
// const callData=await Promise.all(callRecordings.map((meeting)=>
//      meeting.queryRecordings()
// ))
// const records=callData.filter(call=>call.recordings.length>0).flatMap(call=>call.recordings)
// setRecordings(records)

// }
// if(type=='recording') fetchrecordings()


// },[type,callRecordings])
  
//     const calls = callTypes();
//     const noCallsMessage = getNoCallsMessage();
  
//     return (
//       <div className='grid grid-cols-1 gap-5 xl:grid-cols-2 '>
//         {/* {calls && calls.length > 0 ? (
//           calls.map(({ id, state: { custom: { description }, startsAt } }) => {
//             return (
//               <MeetingCard2
//                 key={id}
//                 title={description?.substring(0, 20) || "no description"}
//                 date={startsAt?.toLocaleString() || "No Date Available"}
//                 isPreviousMeeting={type === "ended"}
//                 buttonText={type === "recording" ? "play" : "start"}
//                 // link={`${"localhost:3000"}/meeting/${id}`}
//                 link={type=="recording"?():()}
//                 handleClick={()=>{}}
//               />
//             );
//           })
//         ) : (
//           <h1>{noCallsMessage}</h1>
//         )} */}
//           {calls && calls.length > 0 ? (
//         calls.map((meeting: Call | CallRecording) => (
//           <MeetingCard2
//             key={(meeting as Call).id}
         
//             title={
//               (meeting as Call).state?.custom?.description ||
//               (meeting as CallRecording).filename?.substring(0, 20) ||
//               'No Description'
//             }
//             date={
//               (meeting as Call).state?.startsAt?.toLocaleString() ||
//               (meeting as CallRecording).start_time?.toLocaleString()
//             }
//             isPreviousMeeting={type === 'ended'}
//             link={
//               type === 'recording'
//                 ? (meeting as CallRecording).url
//                 : `${"localhost:3000"}/meeting/${(meeting as Call).id}`
//             }
            
//             buttonText={type === 'recording' ? 'Play' : 'Start'}
//             handleClick={
//               type === 'recording'
//                 ? () =>{ router.push(`${(meeting as CallRecording)?.url}`)
//                 console.log(`${(meeting as CallRecording).url}`)}

                        
                
//                 : () => router.push(`/meeting/${(meeting as Call).id}`)
//             }
//           />
//         ))
//       ) : (
//         <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
//       )}
//       </div>
//     );
//   };
  
//   export default CallList;
"use client"
import { useGetCalls } from "@/hooks/useGetCalls";
import Loader from "./Loader";
import MeetingCard2 from "./MeetingCard2";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {  useToast } from "./ui/use-toast";

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recording' }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[] | null>(null);
  const router = useRouter();

const {toast}=useToast()
  // useEffect(() => {
  //   const fetchRecordings = async () => {
  //     try {
  //       if (type !== 'recording') return; // Early return to avoid unnecessary calls

  //       const callData = await Promise.all(
  //         callRecordings.map((meeting) => meeting.queryRecordings())??[]
  //       );
  //       const records = callData.filter((call) => call.recordings.length > 0).flatMap((call) => call.recordings);
  //       setRecordings(records);
  //     }
  //      catch (error) {
  //       toast({title:"try again later"})
  //     }
  //     fetchRecordings();
     
  // }, [type, callRecordings]);
  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        if (type !== 'recording') return; // Early return to avoid unnecessary calls
  
        const callData = await Promise.all(
          callRecordings.map((meeting) => meeting.queryRecordings())??[]
        );

        const records = callData.filter((call) => call?.recordings.length > 0).flatMap((call) => call?.recordings);
        setRecordings(records);

      } catch (error) {
        console.error("Error fetching recordings:", error);
        toast({ title: "An error occurred. Please try again later." }); // Informative toast
      }
    };
  
    fetchRecordings();
  }, [type, callRecordings]);
  


  const callTypes = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "upcoming":
        return upcomingCalls;
      case "recording":
        return recordings;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No previous calls";
      case "upcoming":
        return "No upcoming calls";
      case "recording":
        return "No recordings";
      default:
        return "";
    }
  };

  // Ensure recordings are fetched only when type is 'recording' and callRecordings change
  if (isLoading) return <Loader />;

  const calls = callTypes();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard2
            key={(meeting as Call).id}
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename?.substring(0, 20) ||
              "No Description"
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString() ||
              "No Date Available"
            }
            isPreviousMeeting={type === "ended"}
            link={type === "recording" ? (meeting as CallRecording).url : `${"localhost:3000"}/meeting/${(meeting as Call).id}`}
            buttonText={type === "recording" ? "Play" : "Start"}
            handleClick={() => {
              if (type === "recording") {
                router.push(`${(meeting as CallRecording)?.url}`);
              } else {
                router.push(`/meeting/${(meeting as Call).id}`);
              }
            }}
          />
        ))
      ) : (
        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
