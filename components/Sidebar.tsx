"use client"
import { navlinks } from '@/constants/navlinks'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
  const pathname=usePathname()
  return (
    <section className='sticky top-0 left-0 flex flex-col h-screen w-fit   max-sm:hidden lg:w-[264px]'>
      <div className='flex flex-1 flex-col gap-6 p-6 pt-24 text-xl text-white bg-[#074173]'>
   { navlinks.map((link)=>{

    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`)

    return <Link

    href={`${link.route}`}
    key={link.label}
    className={cn('flex gap-4 items-center p-4 rounded-lg justify-start',{
     " bg-blue-600":isActive,
    })}
    
    >
      {link.label}

    </Link>
   }) }
      </div>

     
    </section>
  )
}

export default Sidebar
