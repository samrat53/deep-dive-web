import React from "react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { todosAtomsFamily } from "./store/atomsFamily";

const AtomFamily = () => {
  return (
    <>
      <h1>AtomFamily</h1>
      <RecoilRoot>
        <Todo id={1} />
        <Todo id={1} />
        <Todo id={1} />
      </RecoilRoot>
    </>
  );
};

const Todo = ({ id }) => {
  const currentTodo = useRecoilValue(todosAtomsFamily(id));
  return (
    <>
      {currentTodo.title}
      <br/>
      {currentTodo.description}
    </>
  );
};

export default AtomFamily;
