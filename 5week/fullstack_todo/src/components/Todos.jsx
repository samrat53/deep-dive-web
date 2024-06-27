// todos=[]
export function Todos({ todos, setTodos }) {

  const handleCompleted = async (id) => {
    fetch("http://localhost:3000/completed", {
      method: "PUT",
      body: JSON.stringify({_id:id}),
      headers: {
        "Content-type": "application/json",
      },
    });

    setTodos(prevTodos =>
        prevTodos.map(todo => {
          if (todo._id === id) return { ...todo, completed: true };
          else return todo;
        })
      );
  };

  return (
    <div>
      <h1>Todo List</h1>
      {todos.map((todo,index) => {
        return (
          <div>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <button key ={index} onClick={()=>handleCompleted(todo._id)}>
              {todo.completed ? "Done" : "Mark as Completed"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
