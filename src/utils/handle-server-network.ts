import {appActions} from 'app/app-reducer'
import {Dispatch} from 'redux'
import axios, {AxiosError} from "axios";

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>//Error - если джаваскриптовая ошибка,AxiosError -ошибка аксиоса
    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : 'Some error occurred'
        dispatch(appActions.setAppError({error}))
    } else {
        dispatch(appActions.setAppError({error: `Native error ${err.message}`}))
    }
    dispatch(appActions.setAppStatus({status: 'failed'}))
}
