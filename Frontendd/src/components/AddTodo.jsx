import React, { useState } from "react";
import axios from "axios";

function AddTodo({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;
    await axios.post("/api/todos", { text });
    setText("");
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new todo"
        className="border px-2 py-1 mr-2 w-3/4"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-1">
        Add
      </button>
    </form>
  );
}

export default AddTodo;