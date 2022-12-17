import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {ErrorAC, PreloaderAC} from "../app/app-reducer";


export const ServerErrorHandler = <T>(data:T, dispatch: Dispatch) => {
    if(typeof data === 'string'){
        dispatch(ErrorAC({error:data}))
        dispatch(PreloaderAC({status:'failed'}))
    }
}

export const NetworkErrorHandler = <T>(data: AxiosError<T>, dispatch: Dispatch) => {
    if (data) {
        dispatch(ErrorAC({error:data.message}))
        dispatch(PreloaderAC({status:'failed'}))
    }
}