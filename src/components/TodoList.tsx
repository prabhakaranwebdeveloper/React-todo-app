import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { TodoType } from "../types/todo";
import { toast } from "react-toastify";
import axios from "axios";

function TodoList() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addTodo = async (todo: TodoType) => {
    if (!todo.text || /^\s*$/.test(todo.text)) return;

    const isDuplicate = todos.some(
      (t) => t.text.toLowerCase().trim() === todo.text.toLowerCase().trim(),
    );

    if (isDuplicate) {
      toast.error("Duplicate values not allowed");
      return;
    }

    const res = await axios.post("http://localhost:5000/api/todos", {
      text: todo.text,
    });

    setTodos((prev) => [res.data, ...prev]);
  };

  const updateTodo = (todoId: number, newValue: TodoType) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) return;

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item)),
    );
  };

  const removeTodo = async (id: number) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const completeTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo,
      ),
    );
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/todos")
      .then((res) => setTodos(res.data));
  }, []);

  return (
    <>
      <h1>What's the Plan for Today?</h1>

      <TodoForm onSubmit={addTodo} />

      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
