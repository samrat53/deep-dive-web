const express = require("express");
const app = express();
const PORT = 3000;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

var users = [
  {
    name: `John`,
    kidneys: [{ healthy: true }],
  },
];

const findHealthyKidneys = (allKidneys) => {
  let count = 0;
  for (let i = 0; i < allKidneys.length; i++) {
    if (allKidneys[i].healthy) count++;
  }
  return count;
};

app.use(express.json());  

app.get("/", (req, res) => {
  const allKidneys = users[0].kidneys;
  const numberOfKidneys = allKidneys.length;
  const healthyKidneys = findHealthyKidneys(allKidneys);
  const unhealthyKidneys = numberOfKidneys - healthyKidneys;
  res.json({
    numberOfKidneys,
    healthyKidneys,
    unhealthyKidneys,
  });
});

app.post("/", (req, res) => {
  const isHealthy=req.body.isHealthy;
  users[0].kidneys.push({healthy:isHealthy});
  // console.log(users[0].kidneys)
  res.json({
    msg:`done`,
  })
});

app.put("/", (req, res) => {
  for(let i=1;i<users[0].kidneys.length;i++){
    if(users[0].kidneys[i-1].healthy==false) 
    users[0].kidneys[i].healthy=true ;
  }
  res.json({});
});

const checkBad=(kidneys)=>{
  for(let i=0;i<kidneys.length;i++){
    if(!kidneys[i].healthy) return true;
  }
  return false;
};

app.delete("/", (req, res) => {
  let atleastOneBad=checkBad(users[0].kidneys);
  if(atleastOneBad){
    //delete all unhealthy kidneys
    let newKidneys=[];
    for(let i=0;i<users[0].kidneys.length;i++){
      if(users[0].kidneys[i].healthy)
      newKidneys.push(users[0].kidneys[i]);
    }
    users[0].kidneys=newKidneys;
    res.json({});
  }
  else res.status(411).json({msg:`Congrats sab theek daru piyo abhi`});
});
