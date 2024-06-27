// after installing tsc and other dependencies we use:
// npm install prisma typescript ts-node @types/node --save-dev
// npx prisma init
// to generate client run: npx prisma generate after initial migrations
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const insertUser = async (
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string
) => {
  const res = await prisma.user.create({
    data: {
      username,
      password,
      firstName,
      lastName,
      email,
    },
  });
  console.log(res);
};
const insertTodo = async (
  userId: number,
  description: string,
  title: string
) => {
  const res = await prisma.todo.create({
    data: {
      userId,
      description,
      title,
    },
  });
  console.log(res);
};

const getTodos = async (userId: number) => {
  const res = await prisma.todo.findMany({
    where: {
      userId: userId,
    },
  });
  console.log(res);
};

// insertUser("test1234","poisrev1234","Samrat1234","bhatt1234", "1234therriui@gmail.com");
// getTodos(1);
// insertTodo(1, "tsc init", "do cocoohort");

// ========================================RELEATIONSHIPS================================================================

const getTodosAndUserDetails = async (userId: number) => {
  const res = await prisma.todo.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      done: true,
      user: true //finds from the user table
    },
  });
  console.log(res);
};
getTodosAndUserDetails(1);
