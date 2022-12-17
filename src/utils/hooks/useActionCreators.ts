import {ActionCreatorsMapObject, bindActionCreators} from "redux";
import {useMemo} from "react";
import {useAppDispatch} from "./useAppDispatch";

export const useActionCreators = <T extends ActionCreatorsMapObject<any>>(actions: T) =>{
    const dispatch = useAppDispatch()

    return useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])
}