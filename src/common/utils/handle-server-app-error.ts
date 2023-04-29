import { Dispatch } from "redux";
import { appActions } from "app/app.reducer";
import { ResponseType } from "../types";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch, showError: boolean = true) => {
  if (showError) {
    console.log("data.messages[0]", data.messages[0]);
    dispatch(appActions.setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }));
  }
};
