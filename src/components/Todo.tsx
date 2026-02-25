import { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import TodoForm from "./TodoForm";
import { TodoType } from "../types/todo";

type TodoProps = {
  todos: TodoType[];
  completeTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, value: TodoType) => void;
};

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }: TodoProps) => {
  const [edit, setEdit] = useState<{ id: number | null; value: string }>({
    id: null,
    value: ""
  });

  const submitUpdate = (value: TodoType) => {
    if (edit.id !== null) {
      updateTodo(edit.id, value);
    }
    setEdit({ id: null, value: "" });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return (
    <>
      {todos.map(todo => (
        <div
          className={todo.isComplete ? "todo-row complete" : "todo-row"}
          key={todo.id}
        >
          <div onClick={() => completeTodo(todo.id)}>{todo.text}</div>

          <div className="icons">
            <IoClose
              onClick={() => removeTodo(todo.id)}
              className="delete-icon"
            />
            <TiEdit
              onClick={() => setEdit({ id: todo.id, value: todo.text })}
              className="edit-icon"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Todo;