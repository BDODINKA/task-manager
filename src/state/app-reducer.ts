import {Dispatch} from "redux";
import {AuthAPI} from "../api/auth-api";
import {LoginAC} from "./auth-reducer";
import {NetworkErrorHandler, ServerErrorHandler} from "../utils/ErrorHandlers";
import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";

export type LoadType = 'idle' | "succeed" | "failed" | "loading"

type Error = null | string

export type LoadStateType = {
    loading: LoadType
    ErrorMessage: Error
    isInitialize: boolean
}
const InitialState: LoadStateType = {
    loading: 'idle',
    ErrorMessage: null,
    isInitialize: false
}

const slice = createSlice({
    name:'APP',
    initialState:InitialState,
    reducers:{
        PreloaderAC:(state:Draft<LoadStateType>,action:PayloadAction<{status: LoadType}>)=>{
            state.loading = action.payload.status
        },
        ErrorAC:(state:Draft<LoadStateType>,action:PayloadAction<{error: Error}>)=>{
            state.loading = 'failed'
            state.ErrorMessage = action.payload.error
        },
        InitializeAC:(state:Draft<LoadStateType>,action:PayloadAction<{isInitialize: boolean}>)=>{
            state.isInitialize = action.payload.isInitialize
        }
    }
})

export const appReducer = slice.reducer

export const {PreloaderAC,ErrorAC,InitializeAC} =slice.actions


export const InitializeAppTC = () => (dispatch: Dispatch) => {
    return AuthAPI.authMe().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(LoginAC({userID:res.data.data.id}))
            dispatch(InitializeAC({isInitialize:!!res}))
        } else {
            ServerErrorHandler<string>(res.data.messages[0], dispatch)
            dispatch(InitializeAC({isInitialize:!!res}))
        }
    }).catch(reason => {
        NetworkErrorHandler(reason, dispatch)
    })

}
