import {AppRootStateType} from "../../app/store";

const selectorIsLogin = (state:AppRootStateType) => state.auth.isLogin

const selectorTodolists = (state:AppRootStateType) => state.todolists

const selectorTasks = (state:AppRootStateType) => state.tasks

export {
    selectorIsLogin,
    selectorTodolists,
    selectorTasks,
}