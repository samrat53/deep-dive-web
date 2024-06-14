'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"

export const Appbar=()=>{
    const session=useSession();
    // const router=useRouter();
    return <div>
        <button className="border m-40 bg-slate-500 rounded-md" onClick={()=>{
            // router.push("/api/auth/signin")
            signIn();
        }}>Signin</button>
        <button className="border bg-slate-500 rounded-md" onClick={()=>{
            signOut();
        }}>Signout</button>
        <h1>{JSON.stringify(session)}</h1> 
        {//in client side use useSession 
        }
    </div>
}