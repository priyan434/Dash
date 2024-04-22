"use server";

import { currentUser } from "@clerk/nextjs";

import { StreamClient } from "@stream-io/node-sdk";

// optionally add timeout to API requests
// the default timeout is 3000ms

const apiKey = process.env.STREAM_API_KEY;
const secret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
    const user = await currentUser();
  
    if (!user) throw new Error('User is not authenticated');
    if (!apiKey) throw new Error('Stream API key secret is missing');
    if (!secret) throw new Error('Stream API secret is missing');
  
    const streamClient = new StreamClient(apiKey, secret);
  
    const expirationTime = Math.floor(Date.now() / 1000) + 3600;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;
  
    const token = streamClient.createToken(user.id, expirationTime, issuedAt);
  // console.log(token);
  
    return token;
  };
