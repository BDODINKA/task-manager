import {ActionCreatorsMapObject, bindActionCreators} from "redux";
import {useMemo} from "react";
import {useAppDispatch} from "./useAppDispatch";

export const useActions=<T extends ActionCreatorsMapObject<T>>(actions: T) =>{
    const dispatch = useAppDispatch()

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])

    return boundActions
}