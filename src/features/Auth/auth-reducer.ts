import {AuthAPI, LoginParamsType} from "../../api/auth-api";
import {PreloaderAC} from "../../app/app-reducer";
import {NetworkErrorHandler, ServerErrorHandler} from "../../utils/ErrorHandlers";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {AllTodosActions} from "../Todolists";


export const LoginTC = createAsyncThunk('AUTH/LOGIN', async (values: LoginParamsType, {dispatch, rejectWithValue}) => {
    const res = await AuthAPI.login(values)
    try {
        dispatch(PreloaderAC({status: 'loading'}))
        if (res.data.resultCode === 0) {
            dispatch(PreloaderAC({status: 'succeed'}))
            return {userID: res.data.data.userId}
        } else {
            ServerErrorHandler<string>(res.data.messages[0], dispatch)
            return rejectWithValue(res.data.messages[0])
        }
    } catch (reason) {
        NetworkErrorHandler(reason as AxiosError, dispatch)
        return rejectWithValue(reason)
    }
})

export const LogoutTC = createAsyncThunk('AUTH/LOGOUT', async (arg, {dispatch, rejectWithValue}) => {
    const res = await AuthAPI.logout()
    try {
        dispatch(PreloaderAC({status: 'loading'}))
        if (res.data.resultCode === 0) {
            dispatch(PreloaderAC({status: 'succeed'}))
            dispatch(AllTodosActions.TodoActions.ClearTodolistsAC({value: null}))
            return {userID: res.data.resultCode}
        } else {
            ServerErrorHandler<string>(res.data.messages[0], dispatch)
            return rejectWithValue(res.data.messages[0])
        }
    } catch (reason) {
        NetworkErrorHandler(reason as AxiosError, dispatch)
        return rejectWithValue(reason)
    }
})


const slice = createSlice({
    name: "AUTH",
    initialState: {
        isLogin: false
    },
    reducers: {
        IsLoggedIn: (state, action: PayloadAction<{ userID: number }>) => {
            if (action.payload.userID) {
                state.isLogin = true
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(LoginTC.fulfilled, (state) => {
            state.isLogin = true
        })
        builder.addCase(LogoutTC.fulfilled, (state) => {
            state.isLogin = false
        })
    }
})

export const {IsLoggedIn} = slice.actions

export const authReducer = slice.reducer


