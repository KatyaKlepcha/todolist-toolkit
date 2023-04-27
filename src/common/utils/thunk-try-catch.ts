import { AppDispatch, AppRootStateType } from 'app/store';
import { handleServerNetworkError } from 'common/utils/handle-server-network-error';
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { appActions } from 'app/app.reducer';
import { ResponseType } from 'common/types';
//Функция thunkTryCatch возвращает результат выполнения logic
export const thunkTryCatch = async (thunkAPI: BaseThunkAPI<AppRootStateType, any, AppDispatch, null | ResponseType>, logic: Function) => {
	const {dispatch, rejectWithValue} = thunkAPI
	dispatch(appActions.setAppStatus({status: 'loading'}))
	try {
		return await logic() //Функция logic - это функция, которую мы хотим выполнить с помощью try-catch. Мы использовали анонимную функцию внутри thunkTryCatch для выполнения logic.
	} catch (e) {
		handleServerNetworkError(e, dispatch)
		return rejectWithValue(null)
	} finally {
		dispatch(appActions.setAppStatus({status: 'idle'}))
	}
}

