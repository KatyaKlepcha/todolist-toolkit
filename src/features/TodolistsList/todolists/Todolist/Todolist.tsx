import React, { FC, memo, useEffect } from "react";
import { TodolistDomainType } from "features/TodolistsList/todolists/todolists.reducer";
import { tasksThunks } from "features/TodolistsList/tasks/tasks.reducer";
import { useActions } from "common/hooks";
import { AddItemForm } from "common/components";
import { TaskType } from "features/TodolistsList/tasks/tasks.api";
import { FilterTasksButtons } from "features/TodolistsList/todolists/Todolist/FilterTasksButtons/FilterTasksButtons";
import { Tasks } from "features/TodolistsList/todolists/Todolist/Tasks/Tasks";
import { TodolistTitle } from "features/TodolistsList/todolists/Todolist/TodolistTitle/TodolistTitle";

type PropsType = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist: FC<PropsType> = memo(function ({ tasks, todolist }) {
  const { fetchTasks, addTask } = useActions(tasksThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCallback = (title: string) => {
    return addTask({ title, todolistId: todolist.id }).unwrap();
  };

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} tasks={tasks} />

      <div style={{ paddingTop: "10px" }}>
        <FilterTasksButtons todolist={todolist} />
      </div>
    </div>
  );
});
