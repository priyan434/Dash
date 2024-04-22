import CallList from '@/components/CallList'
import React from 'react'

const previous = () => {
  return (
    <section className='text-white flex flex-col size-full gap-10'>
    <h1 className='text-3xl font-bold'>previous</h1>
    <CallList type="ended"/>
    </section>
  )
}

export default previous
