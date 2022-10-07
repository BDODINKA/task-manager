import {Dispatch} from "redux";
import {AuthAPI, LoginParamsType} from "../api/auth-api";
import {PreloaderAC} from "./app-reducer";
import {NetworkErrorHandler, ServerErrorHandler} from "../utils/ErrorHandlers";
import {ClearTodolistsAC} from "./todolists-reducer";

export type AuthStateType = typeof initialState
type AllActions = ReturnType<typeof LoginAC> | ReturnType<typeof LogoutAC>

const initialState = {
    isLogin: false
}


export const AuthReducer = (state: AuthStateType = initialState, action: AllActions) => {
    switch (action.type) {
        case "Login": {
            return action.payload && {...state, isLogin: true}
        }
        case "Log-Out": {
            return action.payload && {...state, isLogin: false}
        }
        default: {
            return state
        }
    }
};

export const LoginAC = (userID: number) => {
    return {
        type: "Login",
        payload: userID
    } as const
}
export const LogoutAC = (userID: number) => {
    return {
        type: "Log-Out",
        payload: userID
    } as const
}

export const LoginTC = (values: LoginParamsType) => (dispatch: Dispatch) => {
    return AuthAPI.login(values)
        .then(res => {
            dispatch(PreloaderAC('loading'))
            if (res.data.resultCode === 0) {
                dispatch(LoginAC(res.data.data.userId))
                dispatch(PreloaderAC('succeed'))
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
            dispatch(PreloaderAC('loading'))
            if (res.data.resultCode === 0) {
                dispatch(LogoutAC(res.data.resultCode))
                dispatch(PreloaderAC('succeed'))
                dispatch(ClearTodolistsAC())
            } else {
                ServerErrorHandler<string>(res.data.messages[0], dispatch)
            }
        }).catch(reason => {
            NetworkErrorHandler(reason, dispatch)
        })
}