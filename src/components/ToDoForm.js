import React from "react";

const ToDoForm = ({ userInput, handleSubmit, handleChange }) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        value={userInput}
        type="text"
        onChange={(e) => handleChange(e.currentTarget.value)}
        placeholder="Enter task..."
      />
      <button>Submit</button>
    </form>
  );
};

export default ToDoForm;
