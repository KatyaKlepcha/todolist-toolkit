import React, { ChangeEvent, FC, memo } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import { TaskType } from "features/TodolistsList/tasks/tasks.api";
import { useActions } from "common/hooks";
import { tasksThunks } from "features/TodolistsList/tasks/tasks.reducer";
import s from "features/TodolistsList/todolists/Todolist/Tasks/Task/styles.module.css";

type PropsType = {
  task: TaskType;
  todolistId: string;
};

export const Task: FC<PropsType> = memo(({ task, todolistId }) => {
  const { removeTask, updateTask } = useActions(tasksThunks);
  const removeTaskHandler = () => removeTask({ taskId: task.id, todolistId });

  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
    updateTask({ taskId: task.id, domainModel: { status }, todolistId });
  };

  const changeTitleHandler = (title: string) => {
    updateTask({ taskId: task.id, domainModel: { title }, todolistId });
  };

  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone && s.wrapper : s.wrapper}>
      <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={changeStatusHandler} />

      <EditableSpan value={task.title} onChange={changeTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
