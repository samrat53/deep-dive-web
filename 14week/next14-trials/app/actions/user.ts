// server actions: the functional components which is used by both frontend and backend, frontend sends a http request to this function, and the backend uses this just as its one of the functions

"use server";

import client from "@/db";

export async function signup(username: string, password: string) {
  // const body = await req.json();
  // console.log(body);
  // console.log(req.headers.get("authorization"));
  // console.log(req.nextUrl.searchParams.get("name"));
  try {
    await client.users.create({
      data: {
        username: username, //body.useername
        password: password, //body.password,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
}
