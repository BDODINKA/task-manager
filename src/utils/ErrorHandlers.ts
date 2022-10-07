import {Dispatch} from "redux";
import {ErrorAC, PreloaderAC} from "../state/app-reducer";
import {AxiosError} from "axios";


export const ServerErrorHandler = <T>(data:T, dispatch: Dispatch) => {
    if(typeof data === 'string'){
        dispatch(ErrorAC(data))
        dispatch(PreloaderAC('failed'))
    }
}

export const NetworkErrorHandler = <T>(data: AxiosError<T>, dispatch: Dispatch) => {
    if (data) {
        dispatch(ErrorAC(data.message))
        dispatch(PreloaderAC('failed'))
    }
}