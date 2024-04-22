import CallList from '@/components/CallList'
import React from 'react'

const upcomings = () => {
  return (
    <section className='text-white flex flex-col size-full gap-10'>
    <h1 className='text-3xl font-bold'>upcomings</h1>
    <CallList type="upcoming"/>
    </section>
  )
}

export default upcomings
