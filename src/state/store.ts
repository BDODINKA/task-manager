import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';
import {appReducer} from "./app-reducer";
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;
