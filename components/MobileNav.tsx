"use client"
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { navlinks } from '@/constants/navlinks'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'


const MobileNav = () => {
    const pathname = usePathname()
    return (
        <section className=' w-full max-w-[264px] hidden max-sm:block  '>
            <Sheet >
                <SheetTrigger className='text-white font-extrabold'>Open</SheetTrigger>
              
                <SheetContent side={'left'} className='bg-indigo-950 text-white pt-28 flex flex-col'>
                   
                    {navlinks.map((link) => {

                        const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`)

                        return <SheetClose asChild>
                            <Link

                            href={`${link.route}`}
                            key={`${link.label}1`}
                            className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
                                " bg-blue-600": isActive,
                            })}

                        >
                            {link.label}

                        </Link>
                        </SheetClose>
                    })}

                </SheetContent>
               
            </Sheet>

        </section>
    )
}

export default MobileNav
