"use client"
import { tokenProvider } from '@/Actions/stream.actions';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import {
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    User,
} from '@stream-io/video-react-sdk';

import { ReactNode, useEffect, useState } from 'react';




const apiKey = "a3hkmwcgnjhq";
const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
    const [client, setClient] = useState<StreamVideoClient>()
    const { user, isLoaded } = useUser();
    useEffect(() => {
        if (!isLoaded || !user) return;
        if (!apiKey) throw new Error('Stream API key is missing');
    
        const client = new StreamVideoClient({
          apiKey: apiKey,
          user: {
            id: user?.id,
            name: user?.username || user?.id,
            image: user?.imageUrl,
          },
          tokenProvider,
        });
    
        setClient(client);
      }, [user, isLoaded]);
    if (!client) return <Loader />
    return (
        <StreamVideo client={client}>
            {children}
        </StreamVideo>
    );
};
export default StreamVideoProvider