const zod=require("zod");

const signupBody=zod.object({
    username:zod.string().email().min(3).max(30),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(6)
})

const signinBody=zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
})

const updateBody=zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().min(6).optional()
})

module.exports={signupBody, signinBody, updateBody};