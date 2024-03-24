import React from "react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { todosAtomsfamily } from "./store/selectorFamily";

const SelectorFamily = () => {
  return (
    <div>
      <h2>SelectorFamily</h2>
      <RecoilRoot>
        <Todo id={1}/>
        <Todo id={2}/>
        <Todo id={1}/>
      </RecoilRoot>
    </div>
  );
};

const Todo=({id})=>{
    const [todo,setTodo]=useRecoilState(todosAtomsfamily(id));
    return (
        <>
        <p>{todo.title}</p>
        <p>{todo.description}</p>
        </>
    )
}

export default SelectorFamily;
