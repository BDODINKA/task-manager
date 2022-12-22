import {AppRootStateType} from "app/store";

const selectorIsLogin = (state:AppRootStateType) => state.auth.isLogin

const selectorTodolists = (state:AppRootStateType) => state.todolists

const selectorTasks = (state:AppRootStateType) => state.tasks

const selectorIsInitialize = (state:AppRootStateType)=>state.app.isInitialize

const selectorErrorMessage = (state:AppRootStateType)=>state.app.ErrorMessage

const selectorIsLoading = (state:AppRootStateType)=>state.app.loading

export {
    selectorIsLogin,
    selectorTodolists,
    selectorTasks,
    selectorIsInitialize,
    selectorErrorMessage,
    selectorIsLoading,
}