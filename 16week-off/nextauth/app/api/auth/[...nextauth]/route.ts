import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth/next";
import  CredentialsProvider from "next-auth/providers/credentials";
import { NEXT_AUTH } from "@/app/lib/auth";
// export function GET(req: NextRequest,{params:{nextauth}}:{params:{
//     nextauth: string[]
// }}){
//     console.log(nextauth);
//     return NextResponse.json({
//         message: "jnkjn"
//     })
// }

const handler=NextAuth(NEXT_AUTH)

export const GET=handler;
export const POST=handler;