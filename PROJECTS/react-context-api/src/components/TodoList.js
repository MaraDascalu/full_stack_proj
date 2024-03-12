import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import "./TodoList.css";

const TodoList = () => {
  const { todos, removeTodoAction } = useContext(TodoContext);

  return (
    <div className="todo-list-container">
      <div className="todo-item-container">
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="todo-item-container">
              <h3>{todo.title}</h3>
              <button onClick={() => removeTodoAction(todo.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
