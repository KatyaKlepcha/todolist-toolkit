import {authAPI, LoginParamsType, ResultCode} from 'api/todolists-api'
import {handleServerNetworkError} from 'utils/handle-server-network'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "app/store";
import {appActions} from "app/app-reducer";
import {tasksActions} from "features/TodolistsList/tasks-reducer";
import {todolistsActions} from "features/TodolistsList/todolists-reducer";
import {handleServerAppError} from "utils/handle-server-app-error";

//slice - редьюсеры, созданные с помощью createSlice
const slice = createSlice({
    // важно чтобы не дублировалось, будет в качетве приставки согласно соглашению redux ducks
    name: 'auth', //соответствует имени в кейсе до слэша
    //❗Если будут писаться тесты на slice или где понадобится типизация,
    // тогда выносим initialState наверх
    initialState: {
        isLoggedIn: false
    },
    // состоит из подредьюсеров, каждый из которых эквивалентен одному оператору case в switch, как мы делали раньше (обычный redux)
    reducers: {
        // логику в подредьюсерах пишем мутабельным образом,
        // т.к. иммутабельность достигается благодаря immer.js
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})

export const authReducer = slice.reducer
export const authActions = slice.actions


// thunks
export const loginTC = (data: LoginParamsType):AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status:'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === ResultCode.ok) {
                dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
                dispatch(appActions.setAppStatus({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logoutTC = ():AppThunk  => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === ResultCode.ok) {
                dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
                dispatch(appActions.setAppStatus({status:'succeeded'}))
                dispatch(todolistsActions.clearTodolists())
                dispatch(tasksActions.clearTasks())
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}