import {Dispatch} from "redux";
import {AuthAPI, LoginParamsType} from "../api/auth-api";

type initialStateType = typeof initialState
type AllActions = ReturnType<typeof LoginAC>

const initialState = {
    isLogin: false
}


export const AuthReducer = (state: initialStateType=initialState, action: AllActions) => {
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
            if(res.data.resultCode === 0){
                console.log(res.data.data.userId)
                dispatch(LoginAC(res.data.data.userId))
            }else{
                console.log(res.data)
            }
        })
}