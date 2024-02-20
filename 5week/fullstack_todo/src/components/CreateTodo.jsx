import React, { useState } from "react";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleNewTodo = (title, description) => {
    fetch("http://localhost:3000/todo", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
      }),
      headers: {
        "Content-type": "application/JSON",
      },
    }).then(async (res) => {
      const json = await res.json();
      alert(`Todo created`);
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <br />
      <button onClick={() => handleNewTodo(title, description)}>
        Add todo
      </button>
    </div>
  );
};

export default CreateTodo;
