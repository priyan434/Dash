import React from 'react';
import { useToast } from './ui/use-toast';

interface ModalProps {
  title: string;
  date: string;
  isPreviousMeeting: boolean;
  buttonText: string;
  link: string;
  handleClick: () => void;
}

const MeetingCard2 = ({
  title,
  date,
  isPreviousMeeting,
  buttonText,
  handleClick,
  link,
}: ModalProps) => {
  const { toast } = useToast();

  return (
    <div className='flex flex-col gap-4 bg-gray-900 text-white p-4 rounded-lg'>
      <div className='icon'> {/* Add your icon element here (e.g., image or SVG) */} </div>
      <div className='text-white flex flex-col gap-3'>
        {title}
        <p>{date}</p>
      </div>

      {!isPreviousMeeting && (
        <div className='flex gap-4'>
          <button className='bg-blue-900 text-md font-semibold p-2 rounded' onClick={handleClick}>
            {buttonText}
          </button>
          <button className='rounded border p-2' onClick={() => {
            navigator.clipboard.writeText(link);
            toast({ title: 'Link copied' }); 
          }}>
            Copy Invitation
          </button>
        </div>
      )}
    </div>
  );
};

export default MeetingCard2;
