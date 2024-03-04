import { memo, useEffect, useState } from "react";
import "./App.css";

const App = memo(() => {
  const [todos, setTodos] = useState([]);

  useEffect(() => { //donot allow use of async directly here
    setInterval(() => {
      fetch("https://dummyjson.com/todos/random").then(async (res) => {
        const data = await res.json();
        setTodos(prevTodos=>[...prevTodos, data]);
      });
    }, 5000);
  }, []);

  return (
    <>
      <div>
        {todos.map((todo) => (
          <RenderTodo
            key={todo.id}
            title={todo.todo}
            completed={todo.completed}
          />
        ))}
      </div>
    </>
  );
});

const RenderTodo = memo(({ title, completed }) => {
  return (
    <>
      <h2>{title}</h2>
      <h4>{completed ? "done" : "not done"}</h4>
    </>
  );
});
export default App;
