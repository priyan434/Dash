import { SignIn } from '@clerk/nextjs'
import React from 'react'

const signin = () => {
  return (
    <main className='bg-indigo-950'>
      <SignIn/>
    </main>
  )
}

export default signin
