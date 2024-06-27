import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../lib/auth";

export default async function (){
    const session=await getServerSession(NEXT_AUTH);
    return <div>
        user page
        <h1>{JSON.stringify(session)}</h1>
    </div>
}
// to the session details in server components, use getServerSession hook