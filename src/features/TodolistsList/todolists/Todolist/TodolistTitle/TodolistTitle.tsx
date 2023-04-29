import { EditableSpan } from "common/components";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import React, { FC } from "react";
import { useActions } from "common/hooks";
import { TodolistDomainType, todolistsThunks } from "features/TodolistsList/todolists/todolists.reducer";
import s from "./styles.module.css";

type PropsType = {
  todolist: TodolistDomainType;
};

export const TodolistTitle: FC<PropsType> = ({ todolist }) => {
  const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

  const removeTodolistHandler = () => removeTodolist(todolist.id);

  const changeTodolistTitleCallback = (title: string) => changeTodolistTitle({ id: todolist.id, title });

  return (
    <h3 className={s.title}>
      <EditableSpan value={todolist.title} onChange={changeTodolistTitleCallback} />
      <IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  );
};
