const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const number=parseInt(req.query.number);
  if(isNaN(number)) res.status(400).send("galat param hai bkl");

  const findSum=(number)=>{
    let sum=0;
    for(let i=1;i<=number;i++) sum+=i;
    return sum;
  }
  res.send(findSum(number).toString());
});

app.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
});
