import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import SummaryButton from "./components/SummaryButton";
import StatusMessage from "./components/StatusMessage";

function App() {
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");
     
  const fetchTodos = async () => {
  try {
    const response = await axios.get("/api/todos");
    const data = response.data;

    // Ensure it's an array
    if (Array.isArray(data)) {
      setTodos(data);
    } else {
      console.error("Invalid todos response:", data);
      setTodos([]); // fallback
    }
  } catch (error) {
    console.error("Failed to fetch todos", error);
    setTodos([]); // fallback
  }
};


  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo Summary Assistant</h1>
      <AddTodo onAdd={fetchTodos} />
      <TodoList todos={todos} onDelete={fetchTodos} />
      <SummaryButton onSummaryComplete={setMessage} />
      {message && <StatusMessage message={message} />}
    </div>
  );
}

export default App;