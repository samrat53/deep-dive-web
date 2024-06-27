import { useMemo, useState } from "react";
import { useEffect, useCallback, useRef, use } from "react";

function App() {
  const [inputValue, setInputValue] = useState(0);
  const [count, setCount] = useState(0);

  // const [sum,setSum]=useState(0);
  // useEffect(()=>{
  //   let temp=0;
  //   for (let i = 1; i <= inputValue; i++) {
  //     temp += i;
  //   }
  //   setSum(temp);
  // },[inputValue])

  // inplace of the above code we can write

  let sum= useMemo(()=>{ //doesnot neet to create another state variable
    let temp=0;
    for(let i=1;i<=inputValue;i++){
      temp+=i;
    }
    return temp;
  },[inputValue]) //since the final sum is dependent on another state varialble

  return (
    <>
      <input
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="input number"
      />
      <p>{`Sum is from 1 to ${inputValue} is ${sum}`}</p>
      <button onClick={() => setCount(count + 1)}>{`Count ${count}`}</button>
    </>
  );

  // const [selectedId, setSelectedId] = useState(1);
  // return (
  //   <div>
  //     <button onClick={() => setSelectedId(1)}>1</button>
  //     <button onClick={() => setSelectedId(2)}>2</button>
  //     <button onClick={() => setSelectedId(3)}>3</button>
  //     <button onClick={() => setSelectedId(4)}>4</button>
  //     <button onClick={() => setSelectedId(5)}>5</button>
  //     <Todo id={selectedId} />
  //   </div>
  // );
}

// function Todo({ id }) {
//   const [todo, setTodo] = useState({});
//   useEffect(() => {
//     fetch(`https://sum-server.100xdevs.com/todo?id=${id}`).then(async (res) => {
//       const json = await res.json();
//       setTodo(json.todo);
//     });
//   }, [id]);

//   return (
//     <div>
//       <h1>{todo.title}</h1>
//       <h4>{todo.description}</h4>
//     </div>
//   );
// }

export default App;
