import React from "react";
import ToDoItem from "./ToDoItem";
import { useTranslation } from "react-i18next";

const ToDoList = ({ toDoList, handleToggle, handleFilter }) => {
  const { t } = useTranslation();
  return (
    <div>
      {toDoList.map((todo, index) => {
        return (
          <ToDoItem
            key={index}
            todo={todo}
            handleToggle={handleToggle}
            handleFilter={handleFilter}
          />
        );
      })}
      <div className="container-translations">
        <button className="button-clear-completed" onClick={handleFilter}>
          Clear Completed
        </button>
        <h1>test plural key</h1>
        <span>{t("key", { count: 1 })}</span>
        <span>{t("key", { count: 5 })}</span>

        <h1>other test</h1>
        <span>{t("keyWithCount", { count: 1 })}</span>
        <span>{t("keyWithCount", { count: 5 })}</span>
        <br />
      </div>
    </div>
  );
};

export default ToDoList;
