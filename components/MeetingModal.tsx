import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from './ui/button';

interface ModalProps {
  isOpen: boolean;
  isClose: () => void;
  buttonText?: string;
  handleClick: () => void;
  children?:ReactNode;
  title: string;
}

const MeetingModal = ({ isOpen, isClose, buttonText, handleClick, title,children }:ModalProps) => {


  return (
    
      // <Dialog open={isOpen} onOpenChange={isClose}>
      //   {/* <DialogTrigger>Open</DialogTrigger> */}
      //   <DialogContent className='bg-indigo-950 border-0 text-white text-3xl font-extrabold h-48 p-6'>
      //     <h1 className='text-center'>{title}</h1>
      //     <Button
      //       className='focus-visible-ring-0 bg-blue-600 hover:bg-blue-700 text-lg'
      //       onClick={handleClick}
      //     >
      //       {buttonText || "Schedule Meeting"}
      //     </Button>
         
      //   </DialogContent>
      // </Dialog>
      <Dialog open={isOpen} onOpenChange={isClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-gray-900 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
         
          <h1 className="text-center font-bold text-2xl">
            {title}
          </h1>
          {children}
          <Button
            className={
              "bg-blue-900  focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-blue-900"
            }
            onClick={handleClick}
          >
            
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
