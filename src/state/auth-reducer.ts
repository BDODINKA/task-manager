import {AuthAPI, LoginParamsType} from "../api/auth-api";
import {PreloaderAC} from "./app-reducer";
import {NetworkErrorHandler, ServerErrorHandler} from "../utils/ErrorHandlers";
import {ClearTodolistsAC} from "./todolists-reducer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";


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
            dispatch(ClearTodolistsAC({value: null}))
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
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(LoginTC.fulfilled, (state) => {
            state.isLogin = true
        })
        builder.addCase(LogoutTC.fulfilled, (state) => {
            state.isLogin = false
        })
    }
})
export const authReducer = slice.reducer


