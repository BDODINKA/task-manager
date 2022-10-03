export type LoadType = 'idle' | "succeed" | "failed" | "loading"

type Error = null | string

export type LoadStateType = {
    loading: LoadType
    ErrorMessage:Error
}

const InitialState: LoadStateType = {
    loading: 'idle',
    ErrorMessage: null
}

type ActionsType = ReturnType<typeof PreloaderAC> | ReturnType<typeof ErrorAC>

export const appReducer = (state: LoadStateType = InitialState, action: ActionsType) => {
    switch (action.type) {
        case "SET-LOAD-STATUS": {
            return {...state, loading: action.status}
        }
        case "SET-ERROR": {
            return {...state, loading: 'failed', ErrorMessage: action.error}
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
