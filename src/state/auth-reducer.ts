import {Dispatch} from "redux";
import {AuthAPI, LoginParamsType} from "../api/auth-api";
import {PreloaderAC} from "./app-reducer";
import {NetworkErrorHandler, ServerErrorHandler} from "../utils/ErrorHandlers";

export type AuthStateType = typeof initialState
type AllActions = ReturnType<typeof LoginAC>

const initialState = {
    isLogin: false
}


export const AuthReducer = (state: AuthStateType=initialState, action: AllActions) => {
    switch (action.type) {
        case "Login":{
                return action.payload && {...state,isLogin: true}
        }
        default:{
            return state
        }
    }
};

const LoginAC = (userID:number)=>{
    debugger
    return {
        type:"Login",
        payload:userID
    }as const
}

export const LoginTC = (values:LoginParamsType) => (dispatch:Dispatch)=>{
    return AuthAPI.auth(values)
        .then(res=>{
            dispatch(PreloaderAC('loading'))
            if(res.data.resultCode === 0){
                dispatch(LoginAC(res.data.data.userId))
                dispatch(PreloaderAC('succeed'))
            }else{
                ServerErrorHandler<string>(res.data.messages[0], dispatch)
            }
        }).catch(reason => {
            NetworkErrorHandler(reason, dispatch)
        })
}