import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <section className='flex justify-between fixed z-50 w-full bg-[#074173]
    px-6 py-4 lg:px-10 pt-4'>
      <Link 
      href='/' 
      className='flex items-center gap-1 '>
     
        <Link href={'/'} className='text-white text-3xl font-bold max-sm:hidden'>Dash</Link>
      </Link>
      <div className='flex justify-between gap-1 '>
        {/* auth part */}
        <SignedIn>
          <UserButton/>
        </SignedIn>
        {/* <SignedOut>
          <SignInButton/>
        </SignedOut> */}
        <MobileNav/>
      </div>
       
    </section>
  )
}

export default Navbar
