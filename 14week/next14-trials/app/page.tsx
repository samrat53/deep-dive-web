import axios from "axios";
async function getUserDetails() {
  await new Promise((r) => setTimeout(r, 500));
  const response = await axios.get("http://localhost:3000/api/user");
  return response.data;
}

export default async function Page() {
  const userData = await getUserDetails(); // async call inside a nextjs component works only in server components

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="border p-8 rounded">
          <div>Name: {userData?.name}</div>
          Email: {userData?.email}
        </div>
      </div>
    </div>
  );
}
