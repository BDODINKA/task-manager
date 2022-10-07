import {Dispatch} from "redux";
import {AuthAPI} from "../api/auth-api";
import {LoginAC} from "./auth-reducer";
import {NetworkErrorHandler, ServerErrorHandler} from "../utils/ErrorHandlers";

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

type ActionsType = ReturnType<typeof PreloaderAC> | ReturnType<typeof ErrorAC> | ReturnType<typeof InitializeAC>

export const appReducer = (state: LoadStateType = InitialState, action: ActionsType) => {
    switch (action.type) {
        case "SET-LOAD-STATUS": {
            return {...state, loading: action.status}
        }
        case "SET-ERROR": {
            return {...state, loading: 'failed', ErrorMessage: action.error}
        }
        case "SET-INITIALIZE":{
            return {...state,isInitialize:action.initialize}
        }
        default:
            return state

    }
}

export const PreloaderAC = (status: LoadType) => {
    return {
        type: "SET-LOAD-STATUS",
        status
    } as const
}
export const ErrorAC = (error: Error) => {
    return {
        type: "SET-ERROR",
        error
    } as const
}
export const InitializeAC = (initialize: boolean) => {
    return {
        type: "SET-INITIALIZE",
        initialize
    } as const
}


export const InitializeAppTC = () => (dispatch: Dispatch) => {
    return AuthAPI.authMe().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(LoginAC(res.data.data.id))
            dispatch(InitializeAC(!!res))
        } else {
            ServerErrorHandler<string>(res.data.messages[0], dispatch)
            dispatch(InitializeAC(!!res))
        }
    }).catch(reason => {
        NetworkErrorHandler(reason, dispatch)
    })

}
