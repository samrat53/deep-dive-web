/*
interface User {
  name: string;
  age: number;
  email: string;
  password: string;
  id: string;
}

// ---------------------------------------pick-----------------------------------------------
// picks some set of properties from a existing type interface

type UpdateProps = Pick<User, "name" | "age" | "email">;
const callDb = (updatedProps: UpdateProps) => {
  // call db
};

// --------------------------------------partial-----------------------------------------------
// marks all properties as optional

type UpdateProps2 = Pick<User, "name" | "age" | "password">;
type UpdateProps2Optional = Partial<UpdateProps>;

// ---------------------------------------readonly--------------------------------------------------
const arr = [123, 345, 565, 66, 44, 21];
arr[2] = 23222; //this is possible even though it is a const since the reference of arr donot change but the internal value changes
const obj = {
  name: "samrat",
};
obj.name = "deba"; //same this is also possible

type UserDetails = {
  readonly name: string;
  readonly num: number;
  //   name: string;
  //   num: number;
};

const user1: Readonly<UserDetails> = {
  name: "jkndj",
  num: 89778,
};
// user1.name="jhj"; not allowed







// some ways to define objects traditionally
type User2 = {
  id: string;
  username: string;
};

type Users2 = {
  // [key: string]: User2; OR:=>
  [key: string]: {
    id: string;
    username: string;
  };
};

const users: Users2 = {
  ert2: {
    id: "ghjk",
    username: "jjnjk",
  },
  ert34: {
    id: "addghjk",
    username: "klihjgf",
  },
};

type UserAccount = {
  [key: string]: number;
};

const simpleUser: UserAccount = {
  balance: 100,
};


// -----------------------------------------------------Records-----------------------------------------------
// cleaner way to give types to objects

type UserTypeSimple=Record<string,number>;
type UserTypeComplicated=Record<string,{age :number, name: string}>;

// Record<keyType,ValueType>




// -------------------------------------------------Map--------------------------------------------------------
// javacript concept
type UserMapType={
    surname: string,
    num: number
}

const userMap=new Map<string,UserMapType>();

userMap.set("someone",{surname:"bhatta", num:80877});
userMap.set("someoneElse",{surname:"singh", num:8087708897});

const userFromMap=userMap.get("someone");
console.log(userFromMap);
userMap.delete("someone");

// ----------------------------------------------excludes-------------------------------------------------------

type EventType='click' | 'scroll' | 'mousemove';
type ExculdeEvent=Exclude<EventType, 'scroll'> // works for only 'click' and 'scroll'

const handleEvent=(event:ExculdeEvent)=>{
    console.log(`handling event: ${event}`);
}
handleEvent('click');
// handleEvent('scroll'); doesnot accept 

}*/