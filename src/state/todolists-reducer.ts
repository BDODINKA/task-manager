import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {LoadType, PreloaderAC} from "./app-reducer";
import {NetworkErrorHandler, ServerErrorHandler} from "../utils/ErrorHandlers";
import {SetTasksTC} from "./tasks-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: LoadType
}

const slice=createSlice({
    name:"TODOLISTS",
    initialState,
    reducers:{
        removeTodolistAC:(state:Array<TodolistDomainType>, action:PayloadAction<{todolistId: string}>) => {
            const idx = state.findIndex(tl=>tl.id === action.payload.todolistId)
            state.splice(idx,1)
        },
        addTodolistAC:(state:Array<TodolistDomainType>, action:PayloadAction<{title: string, todolistID: string}>) => {
            state.unshift({
                id: action.payload.todolistID,
                title: action.payload.title,
                filter: 'all',
                addedDate: '',
                order: 0,
                entityStatus: "succeed"
            })
        },
        changeTodolistTitleAC:(state:Array<TodolistDomainType>, action:PayloadAction<{id: string, title: string}>) => {
            const todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                todolist.title = action.payload.title
            }
            return state
        },
        changeTodolistFilterAC:(state:Array<TodolistDomainType>, action:PayloadAction<{id: string, filter: FilterValuesType}>) => {
            const todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                todolist.filter = action.payload.filter
            }
            return state
        },
        SetTodolistsAC:(state:Array<TodolistDomainType>, action:PayloadAction<{todolists: TodolistType[]}>) => {
            return state = action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "succeed"}))
        },
        SetStatusAC:(state:Array<TodolistDomainType>, action:PayloadAction<{id: string, entityStatus: LoadType}>) => {
            const todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                todolist.entityStatus = action.payload.entityStatus
            }
        },
        ClearTodolistsAC:(state:Array<TodolistDomainType>, action:PayloadAction<{ value:null }>) => {
            if(action.payload.value){
                return state=[]
            }
        },
    }
})

export const todolistsReducer = slice.reducer

export const {removeTodolistAC,addTodolistAC,changeTodolistTitleAC,changeTodolistFilterAC,SetTodolistsAC,SetStatusAC,ClearTodolistsAC}=slice.actions


export const SetTodolistsTC = () => {
    return (dispatch: Dispatch | any) => {
        dispatch(PreloaderAC({status:'loading'}))
        todolistsAPI.getTodolists()
            .then((res) => {
                    dispatch(SetTodolistsAC({todolists:res.data}))
                    dispatch(PreloaderAC({status:'succeed'}))
                    return res
                }
            ).then(res => {
            res.data.forEach(tl => dispatch(SetTasksTC(tl.id)))
        })
            .catch((reason) => {
                NetworkErrorHandler(reason, dispatch)
            })
    }
}

export const AddTodolistsTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(PreloaderAC({status:'loading'}))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC({title:res.data.data.item.title,todolistID:res.data.data.item.id}))
                    dispatch(PreloaderAC({status:'succeed'}))
                } else {
                    ServerErrorHandler<string>(res.data.messages[0], dispatch)
                }
            }).catch((reason) => {
                NetworkErrorHandler(reason, dispatch)
            }
        )
    }
}

export const ChangeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(PreloaderAC({status:'loading'}))
        dispatch(SetStatusAC({id,entityStatus:'loading'}))
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC({id, title}))
                    dispatch(PreloaderAC({status:'idle'}))
                } else {
                    ServerErrorHandler<string>(res.data.messages[0], dispatch)
                }
                dispatch(SetStatusAC({id,entityStatus:'idle'}))
            }).catch(
            (reason) => {
                NetworkErrorHandler(reason, dispatch)
            })
    }
}

export const DeleteTodolistTC = (id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(PreloaderAC({status:'loading'}))
        dispatch(SetStatusAC({id,entityStatus: "loading"}))
        todolistsAPI.deleteTodolist(id)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC({todolistId:id}))
                    dispatch(PreloaderAC({status:'succeed'}))
                } else {
                    ServerErrorHandler<string>(res.data.messages[0], dispatch)
                }
            })
            .catch(reason => {
                NetworkErrorHandler(reason, dispatch)
            })
    }
}

