import React from "react";

const ToDoItem = ({ todo, handleToggle }) => {
  return (
    <div
      id={todo.id}
      key={todo.id + todo.task}
      name="todo"
      value={todo.id}
      onClick={(e) => handleToggle(e.currentTarget.id)}
      className={todo.complete ? "todo strike" : "todo"}
    >
      {todo.task}
    </div>
  );
};

export default ToDoItem;
