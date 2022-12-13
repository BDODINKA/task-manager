import {Dispatch} from "redux";
import {AuthAPI, LoginParamsType} from "../api/auth-api";
import {PreloaderAC} from "./app-reducer";
import {NetworkErrorHandler, ServerErrorHandler} from "../utils/ErrorHandlers";
import {ClearTodolistsAC} from "./todolists-reducer";
import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";

export type AuthStateType = typeof initialState

const initialState = {
    isLogin: false
}



const slice=createSlice({
    name:"AUTH",
    initialState,
    reducers:{
        LoginAC:(state:Draft<AuthStateType>, action:PayloadAction<{ userID: number }>)=>{
            if(action.payload.userID){
                state.isLogin= true
            }
        },
        LogoutAC:(state, action:PayloadAction<{ userID: number }>)=>{
            if(action.payload.userID){
                state.isLogin= false
            }
        }
    }
})
export const authReducer=slice.reducer
export const {LoginAC,LogoutAC} = slice.actions

export const LoginTC = (values: LoginParamsType) => (dispatch: Dispatch) => {
    return AuthAPI.login(values)
        .then(res => {
            dispatch(PreloaderAC({status:'loading'}))
            if (res.data.resultCode === 0) {
                dispatch(LoginAC({userID:res.data.data.userId}))
                dispatch(PreloaderAC({status:'succeed'}))
            } else {
                ServerErrorHandler<string>(res.data.messages[0], dispatch)
            }
        }).catch(reason => {
            NetworkErrorHandler(reason, dispatch)
        })
}
export const LogoutTC = () => (dispatch: Dispatch) => {
    return AuthAPI.logout()
        .then(res => {
            dispatch(PreloaderAC({status:'loading'}))
            if (res.data.resultCode === 0) {
                dispatch(LogoutAC({userID:res.data.resultCode}))
                dispatch(PreloaderAC({status:'succeed'}))
                dispatch(ClearTodolistsAC())
            } else {
                ServerErrorHandler<string>(res.data.messages[0], dispatch)
            }
        }).catch(reason => {
            NetworkErrorHandler(reason, dispatch)
        })
}