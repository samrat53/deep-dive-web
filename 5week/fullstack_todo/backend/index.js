const express = require("express");
const { createTodos, updateTodo } = require("./types");
const { todoCollection } = require("./db");
const app = express();
app.use(express.json());
const PORT=3000;

app.post("/completed", async (req, res) => {
  const todoId = req.body;
  const parseId = updateTodo.safeParse(todoId);
  if (!parseId.success) return res.status(411).json({ msg: "Invalid todo id" });
  //update in db set completed =true
  try {
    await todoCollection.updateOne(
      {
        _id: todoId,
      },
      {
        completed: true,
      }
    );
  } catch (err) {
    res.status(400).send("couldnot update the todo");
  }
  res.status(200).json({ msg: "todo updated to true" });
});

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await todoCollection.find({});
    res.status(200).json({ allTodos: allTodos });
  } catch (error) {
    res.status(500).json({ msg: "database down" });
  }
});

app.post("/todo", async (req, res) => {
  const newTodo = req.body;
  const parsedTodo = createTodos.safeParse(newTodo);
  if (!parsedTodo.success) res.status(411).json({ msh: `Invalid inputs` });

  try {
    await todoCollection.create({
      title: newTodo.title,
      description: newTodo.description,
      completed: newTodo.completed,
    });
  } catch (error) {
    res.status(500).json({ msg: "couldnot add todo" });
  }
  res.status(200).json({ msg: "todo added" });
});

app.listen(PORT);