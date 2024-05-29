import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export function GET() {
  return Response.json({
    email: "sama@gmail.com",
    name: "samrat",
  });
}
/*{
    this is same as:

    app.get("/api/user",(req,res)=>{
        return res.json({
            name:"kdkl",
            email:"jjdn"
        })
    })
}*/

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);

  await client.users.create({
    data: {
      username: body.username,
      password: body.password,
    },
  });

  return Response.json({ message: "loged in" });
}

