import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth/next";
import  CredentialsProvider from "next-auth/providers/credentials";
// export function GET(req: NextRequest,{params:{nextauth}}:{params:{
//     nextauth: string[]
// }}){
//     console.log(nextauth);
//     return NextResponse.json({
//         message: "jnkjn"
//     })
// }

const handler=NextAuth({
    providers:[
        CredentialsProvider({
            name:"Email",
            credentials:{
                username:{label:"Enter your email",type:'text',placeholder:"Email"},
                password:{label:"Enter your password",type:'password',placeholder:"Password"}
            },async authorize(credentials:any){
                const username=credentials.username;
                const password=credentials.password;
                console.log(username,password);
                // const user=prisma.user.findOne({
                //     where:{
                //         email: username,
                //         password:password
                //     }
                // })
                return {
                    id:"user.id",
                    email:"user.email",
                    name: "user.name"
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET
})

export const GET=handler;
export const POST=handler;