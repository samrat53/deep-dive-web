const express = require("express");
const { createTodos, updateTodo } = require("./types");
const { todoCollection } = require("./db");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const PORT = 3000;

app.put("/completed", async (req, res) => {
  const todoId = req.body;
  const parseId = updateTodo.safeParse(todoId);
  if (!parseId.success) return res.status(411).json({ msg: "Invalid todo id" });
  //update in db set completed =true
  try {
    await todoCollection.updateOne(
      {
        _id: todoId._id,
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
    const todos = await todoCollection.find({});
    res.status(200).json({ todos });
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
      completed: newTodo.completed || false,
    });
  } catch (error) {
    res.status(500).json({ msg: "couldnot add todo" });
  }
  res.status(200).json({ msg: "todo added" });
});

app.listen(PORT);
