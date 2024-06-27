// Singleton primsa client to instiaate once, to not create multiple instances after every hot reload- in dev mode only

import { PrismaClient } from "@prisma/client";
const prismaClientSingleton=()=>{
    return new PrismaClient();
}

declare global{
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma= globalThis.prisma??prismaClientSingleton()
export default prisma

if(process.env.Node_ENV!='production') globalThis.prisma=prisma
// globalThis doesnot change on hot reload