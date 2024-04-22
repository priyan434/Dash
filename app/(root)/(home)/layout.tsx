import { Metadata } from 'next';
import { ReactNode } from 'react';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Toaster } from "@/components/ui/toaster"
import '@stream-io/video-react-sdk/dist/css/styles.css';
export const metadata: Metadata = {
  title: 'Dash',
  description: 'hi, Im Priyan this is my first nextjs project',
};

const RootLayout = ({ children }: {children: ReactNode}) => {
  return (

    
    <main className="relative">
      
<Navbar/>
      <div className="flex">
        <Sidebar />
        
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-24 max-md:pb-14 sm:px-14 ">
          <div className="w-full">{children}</div>
          <Toaster />
        </section>
      </div>

    </main>


     
  )
};

export default RootLayout;
