import { getServerSession } from "next-auth"

export default async function (){
    const session=await getServerSession();
    return <div>
        user page
        <h1>{JSON.stringify(session)}</h1>
    </div>
}
// to the session details in server components, use getServerSession hook