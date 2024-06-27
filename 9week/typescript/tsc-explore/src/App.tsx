import "./App.css";

function App() {
  return (
    <>
      <Todo title="Gym" description="hitt gym" done={false} />
    </>
  );
}

interface TodoProp {
  title: string;
  description: string;
  done: boolean;
  greet?(phrase: string): void; //a function having a string of phrase that returns void
}

function Todo({ title, description, done }: TodoProp) {
  return (
    <>
      <h1>{title}</h1>
      <h2>{description}</h2>
      <h3>{done ? "Done" : "not done"}</h3>
    </>
  );
}

export default App;
