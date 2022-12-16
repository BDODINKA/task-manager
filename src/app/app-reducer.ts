import {AuthAPI} from "../api/auth-api";
import {NetworkErrorHandler, ServerErrorHandler} from "../utils/ErrorHandlers";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {IsLoggedIn} from "../features/Auth/auth-reducer";

export type LoadType = 'idle' | "succeed" | "failed" | "loading"

type Error = null | string

export type LoadStateType = {
    loading: LoadType
    ErrorMessage: Error
    isInitialize: boolean
}

export const InitializeAppTC = createAsyncThunk('APP/INITIALIZE-APP', async (arg, {dispatch, rejectWithValue}) => {
    const res = await AuthAPI.authMe()
    try {
        if (res.data.resultCode === 0) {
            dispatch(IsLoggedIn({userID: res.data.data.id}))
            return;
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
    name: 'APP',
    initialState: {
        loading: 'idle',
        ErrorMessage: null,
        isInitialize: false
    } as LoadStateType,
    reducers: {
        PreloaderAC: (state, action: PayloadAction<{ status: LoadType }>) => {
            state.loading = action.payload.status
        },

        ErrorAC: (state, action: PayloadAction<{ error: Error }>) => {
            state.loading = 'failed'
            state.ErrorMessage = action.payload.error
        },
    },
    extraReducers: (builder) => {
        builder.addCase(InitializeAppTC.fulfilled, (state) => {
            state.isInitialize = true
        })
    }
})

export const appReducer = slice.reducer

export const {PreloaderAC, ErrorAC} = slice.actions



