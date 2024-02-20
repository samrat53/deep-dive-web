const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL);

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todoCollection = mongoose.model("todo-lists", todoSchema);

module.exports = { todoCollection };
