const express=require('express');
const app=express();
const PORT=3000;
const mainRouter=require("./routes/index")

app.use(express.json());
app.listen(PORT);

app.use("/api/v1",mainRouter);