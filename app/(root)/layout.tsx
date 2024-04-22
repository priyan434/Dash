import React, {  ReactNode } from 'react'
import StreamVideoProvider from '@/providers/StreamClientProviders'

const RootLayout = ({children}:{children:ReactNode}) => {
  return (
    <StreamVideoProvider>
    

        {children}
      
    
    </StreamVideoProvider>
  )
}

export default RootLayout
