import CallList from '@/components/CallList'
import React from 'react'

const recordings = () => {
  return (
    <section className='text-white flex flex-col size-full gap-10'>
    <h1 className='text-3xl font-bold'>recordings</h1>
    <CallList type="recording" />
    </section>
  )
}

export default recordings
