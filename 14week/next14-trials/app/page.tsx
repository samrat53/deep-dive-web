import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// const client = new PrismaClient(); // this is removed to remove multiple client instatiaton after eevery hot reload
import client from "@/db";

async function getUserDetails() {
  // await new Promise((r) => setTimeout(r, 500));
  // const response = await axios.get("http://localhost:3000/api/user");
  // return response.data;
  const user = await client.users.findFirst(); // db call directly
  return {
    username: user?.username,
    password: user?.password,
  };
}

export default async function Page() {
  //server side data fetching
  const userData = await getUserDetails(); // async call inside a nextjs component works only in server components

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="border p-8 rounded">
          <div>Name: {userData?.username}</div>
          Email: {userData?.password}
        </div>
      </div>
    </div>
  );
}
