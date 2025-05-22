import React from "react";
import axios from "axios";

function TodoList({ todos, onDelete }) {
  const handleDelete = async (id) => {
    await axios.delete(`/api/todos/${id}`);
    onDelete();
  };

  return (
    <ul className="mb-4">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex justify-between items-center border-b py-2"
        >
          {todo.text}
          <button
            onClick={() => handleDelete(todo.id)}
            className="bg-red-500 text-white px-2 py-1"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;