import {AppRootStateType} from "../../app/store";

const selectorIsLogin = (state:AppRootStateType) => state.auth.isLogin

const selectorTodolists = (state:AppRootStateType) => state.todolists

const selectorTasks = (state:AppRootStateType) => state.tasks

const selectorIsInitialize = (state:AppRootStateType)=>state.app.isInitialize

const selectorErrorMessage = (state:AppRootStateType)=>state.app.ErrorMessage

export {
    selectorIsLogin,
    selectorTodolists,
    selectorTasks,
    selectorIsInitialize,
    selectorErrorMessage,

}