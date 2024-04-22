
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

const ScheduleMeetingModal = ({ isOpen, isClose, buttonText, handleClick, title,children }:ModalProps) => {
  return (
    <>
       <Dialog open={isOpen} onOpenChange={isClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white ">
        <div className="flex flex-col gap-6">
         
          <h1 className={""}>
            {title}
          </h1>
          {children}


          <Button
            className={
              "bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            }
            onClick={handleClick}
          >
            
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}

export default ScheduleMeetingModal
