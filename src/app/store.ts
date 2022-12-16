
import {appReducer} from "./app-reducer";
import {combineReducers} from 'redux';
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {tasksReducer} from "../features/Todolists/Task/tasks-reducer";
import {todolistsReducer} from "../features/Todolists/todolists-reducer";
import {authReducer} from "../features/Auth/auth-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth:authReducer,
})

export const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().prepend(thunk)
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = typeof store.dispatch


// @ts-ignore
window.store = store;
