import React from "react";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
} from "recoil";
import { todosAtomsfamily } from "./store/selectorFamily";

const SelectorFamily = () => {
  return (
    <div>
      <h2>SelectorFamily</h2>
      <RecoilRoot>
        <Todo id={1} />
        <Todo id={2} />
        <Todo id={1} />
      </RecoilRoot>
    </div>
  );
};

const Todo = ({ id }) => {
  // const [todo,setTodo]=useRecoilState(todosAtomsfamily(id)); // get directly
  const [todo, setTodo] = useRecoilStateLoadable(todosAtomsfamily(id));
  console.log(todo); // todo{state:..., contents:...}

  if (todo.state === "loading") return <div>Loading boss...</div>;
  else if (todo.state === "hasValue") {
    return (
      <>
        <p>{todo.contents.title}</p>
        <p>{todo.contents.description}</p>
      </>
    );
  }
  else if (todo.state === "hasError") {
    return <div>Backend bkc kr diya</div>
  }
};

export default SelectorFamily;
