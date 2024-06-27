const express = require("express");
const app = express();
const PORT = 3000;

const zod = require("zod");
// const schema=zod.array(zod.number());

const validateInputs = (obj) => {
  const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    country: zod.literal("IN").or(zod.literal("US")),
  });
  return schema.safeParse(obj);
};
let numberOfRequest=0;
const countHit=(req,res,next)=>{
  numberOfRequest++;
  console.log(numberOfRequest);
  next();
}

app.listen(PORT);
app.use(countHit); // be hit always in
app.use(express.json()); //will be used in every function call

app.get("/health-checkup", (req, res) => {
  const response = validateInputs(req.body);
  if (!response.success) res.json({ msg: "inputs invalid" });

  res.json({ status: "valid input", data: response.data });
});

// app.use((err, req, res, next) => {
//   //global catches defined at the end always, takes 4 params
//   console.log(err);
//   res.json({
//     msg: "bad server",
//   });
// });
