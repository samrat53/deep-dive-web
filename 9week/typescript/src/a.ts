const a: number = 1;
console.log(a);

const greet = (firstname: string, age: number) => {
  console.log(`hello ${firstname}`);
};

const sum = (a: number, b: number): number => {
  return a + b;
};

const isLegfal = (age: number) => {
  if (age >= 18) return true;
  else return false;
};

const callAfterOneSec = (fn: () => void) => {
  //this callAfterOneSec expects a function that have no parameters and returns nothing
  setTimeout(fn, 1000);
};

callAfterOneSec(() => {
  console.log("function called");
});

// ------------------------interfaces------------------------------------
// used for objects
// interfaces we can extend in a class while types couldnot be extended in a class
// types let you do ors and ands {union and intersection}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender?: string; // optional field
}

const checkLegal = (user: User) => {
  console.log(user.gender);
  if (user.age >= 18) return `${user.firstName} ${user.lastName} can vote`;
  else return `${user.firstName} ${user.lastName} cannot vote`;
};

checkLegal({
  firstName: "samrat",
  lastName: "bhatt",
  email: "hello@hotmail.com",
  age: 25,
});



// ----------------------------implements of a interface------------------------
// you cannot imlement a class with type, can inly be done with interface

interface Person {
  name: string;
  age: number;
  greetings(phrase: string): void;
}

class Boss implements Person{
  name: string;
  age: number;
  constructor(name:string, age:number){
    this.name=name;
    this.age=age;
  }
  greetings(phrase: string): void {
    console.log(`${phrase} ${this.name}`)
  }
}



// ------------------------------type in tsc---------------------------------
// almost similar to interfaces just that type uas a = wheere interfaces donot

//usecase 1: Union

type GreetArgs = number | string | boolean;
const greetUser = (id: GreetArgs) => {
  alert(id);
};

// useCase 2: intersection

interface Employee {
  name: string;
  startDate: Date;
}

interface Manager {
  name: string;
  department: string;
}

type TechLead = Employee & Manager;

const t: TechLead = {
  name: "Samrat",
  startDate: new Date(),
  department: "devOps",
};



// ------------------------------------------arrays: just use a [] operator---------------------------


type NumberArray = number[]; // this cannot be done with interface
// const findMax=(arr: NumberArray)=>{
// }

const findMax = (arr: number[]) => {
  const max = Math.max(...arr);
  return max;
};

//---------2-----------
interface UserProps {
  firstName: string;
  lastName: string;
  age: number;
}
const adults = (arr: UserProps[]) => {
  const adultsArr = arr.filter((item) => item.age >= 18);
  return adultsArr;
};
