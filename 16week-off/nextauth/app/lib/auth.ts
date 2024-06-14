import  CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
// pass this config to get get the user id or sub in the client and server components
// for login with google: genrate clientid and secret with OAuth from gcp
export const NEXT_AUTH={
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
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID || "",
            clientSecret:process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        GitHubProvider({
            clientId:process.env.GITHUB_CLIENT_ID || "",
            clientSecret:process.env.GITHUB_CLIENT_SECRET || ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        signIn:({user}:any)=>{
            if(user.email==="google.com") return false;
            return true;
        },
        jwt:({token,user}:any)=>{
            console.log(token);
            // console.log(user);
            // do changes with token
            token.userId=token.sub;
            return token;
        },
        session:({session,token,user}:any)=>{
            session.user.id=token.sub; // this gives the id to the client (frontend)
            return session;
        }
    },
    pages:{
        signIn:"/signin" // with this tell that the new signin page is located here
    }
}