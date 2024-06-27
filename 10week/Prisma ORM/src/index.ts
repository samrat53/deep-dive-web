import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const insertUser = async (
  username: string,
  password: string,
  lastName: string,
  firstName: string
) => {
  const res = await prisma.user.create({
    data: {
      email: username,
      password,
      lastName,
      firstName,
    },
    select: {
      //by select: means the res object will have the id and password
      id: true,
      password: true,
    },
  });
  console.log(res);
};

// insertUser(
//   "samrat123@gmail.com",
//   "samratMarriesAnjali",
//   "bhattacharya",
//   "samrat"
// );

interface UpdateParams {
  firstName: string;
  lastName: string;
}
const updateUser = async (
  username: string,
  { firstName, lastName }: UpdateParams
) => {
  const res = await prisma.user.update({
    data: {
      firstName,
      lastName,
    },
    where: {
      email: username,
    },
    select: {
      email: true,
      firstName: true,
      lastName: true,
      id: true,
    },
  });
  console.log(res);
};
// updateUser("yash@gmail.com", { firstName: "anurag", lastName: "anurag" });

const deleteUser = async (username: string) => {
  const res = await prisma.user.delete({
    select: {
      firstName: true,
      password: true,
    },
    where: {
      email: username,
    },
  });
  console.log(
    `the user with firstname ${res.firstName} and password ${res.password} is deleted`
  );
};

deleteUser("samrat123@gmail.com");
