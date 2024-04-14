import { memo, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const useTodos = (n) => {
  //custom hook to get todos
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios.get("https://sum-server.100xdevs.com/todos").then((res) => {
        setTodos(res.data.todos);
      });
    }, n * 1000);

    axios.get("https://sum-server.100xdevs.com/todos").then((res) => {
      setTodos(res.data.todos);
      setLoading(false);
    });

    return () => {
      //reason: if the n changes then the clock has to be resetted as per the new n which wonnt happen if we donot clear the previous clock
      clearInterval(intervalId);
    };
  }, [n]);

  return { todos, loading };
};

function App() {
  const { todos, loading } = useTodos(5);

  return (
    <>
      {loading
        ? "loading..."
        : todos.map((todo, index) => {
            return <Track todo={todo} key={index} />;
          })}
    </>
  );
}

const Track = memo(({ todo, index }) => {
  return (
    <div key={index}>
      <h2>{todo.title}</h2>
      {todo.description}
      <br />
      <br />
    </div>
  );
});

export default App;
