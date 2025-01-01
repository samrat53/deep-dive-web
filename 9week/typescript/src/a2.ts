// --------------------------------------------------------ENUMS----------------------------------------------
// type KeyInput = "Up" | "Down" | "Right" | "left"; donot use this

enum Keypress {
  up = "up",
  down = "down",
  right = "right",
  left = "left",
}
// enum Keypress {
//   up,
//   Down,
//   right,
//   left,
// }

const keyStroke = (key: Keypress) => {
  console.log(`Inside ${key}`);
};

keyStroke(Keypress.down);

import express from "express"; //npm i express @types/express
const app=express();
enum ResponseStatus{
    Success=200,
    NotFound=404,
    Error=500
}

app.get("/",(req,res)=>{
    if(!req.userId)
        return res.status(ResponseStatus.NotFound).message("jk");
})



//------------------------------Generics---------------------------------------------------------

const identity=<T>(args:T)=>{
    return args;
}
 let output1=identity<string>("hello");
 let output2=identity<number>(112);
 output1.toUpperCase();

 interface Userss{
    name: string, num: number
 }
 const getFirstElement=<T>(element: T[]):T=>{
    return element[0];
 }

getFirstElement<string>(["name1", "name2"]).toLowerCase();
getFirstElement<number>([1, 2]);
getFirstElement<boolean>([true, false]);
getFirstElement<Userss>([{name: "jnakjnkj", num:122}]); // can take complex types
// getFirstElement<string>(["kjjhn",1]); // like this prevent the mixed bag {try uncommenting to check}
getFirstElement(["kjjhn",1]); // like this prevent the mixed bag