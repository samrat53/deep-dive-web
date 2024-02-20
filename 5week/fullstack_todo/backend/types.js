const zod = require("zod");

const createTodos = zod.object({
  title: zod.string(),
  description: zod.string(),
  completed: zod.boolean(),
});

const updateTodo = zod.object({
  _id: zod.string(),
});

module.exports = { createTodos, updateTodo };
