import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {LoadType, PreloaderAC} from "./app-reducer";
import {NetworkErrorHandler, ServerErrorHandler} from "../utils/ErrorHandlers";


export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

export type SetTodolistsActionType = ReturnType<typeof SetTodolistsAC>
export  type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export  type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export  type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export  type SetStatusActionType = ReturnType<typeof SetStatusAC>

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType
    | SetStatusActionType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: LoadType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistID,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0,
                entityStatus: "succeed"
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "succeed"}))
        }
        case "SET-STATUS": {
            return state.map(tl => tl.id === action.payload.id ? {
                ...tl, entityStatus: action.payload.status
            } : tl)
        }

        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (title: string, todolistID: string) => {
    return {type: 'ADD-TODOLIST', title, todolistID} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const SetTodolistsAC = (todolists: TodolistType[]) => {
    return {type: 'SET-TODOLISTS', todolists: todolists} as const
}
export const SetStatusAC = (id: string, status: LoadType) => {
    return {type: 'SET-STATUS', payload: {id, status}} as const
}


export const SetTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(PreloaderAC('loading'))
        todolistsAPI.getTodolists()
            .then((res) => {
                    dispatch(SetTodolistsAC(res.data))
                    dispatch(PreloaderAC('succeed'))
                }
            )
            .catch((reason) => {
                NetworkErrorHandler(reason, dispatch)
            })
    }
}
export const AddTodolistsTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(PreloaderAC('loading'))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC(res.data.data.item.title, res.data.data.item.id))
                    dispatch(PreloaderAC('succeed'))
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
        dispatch(PreloaderAC('loading'))
        dispatch(SetStatusAC(id,'loading'))
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC(id, title))
                    dispatch(PreloaderAC('idle'))
                } else {
                    ServerErrorHandler<string>(res.data.messages[0], dispatch)
                }
                dispatch(SetStatusAC(id,'idle'))
            }).catch(
            (reason) => {
                NetworkErrorHandler(reason, dispatch)
            })
    }
}
export const DeleteTodolistTC = (id: string) => {
    return (dispatch: Dispatch) => {
        dispatch(PreloaderAC('loading'))
        dispatch(SetStatusAC(id, "loading"))
        todolistsAPI.deleteTodolist(id)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC(id))
                    dispatch(PreloaderAC('succeed'))
                } else {
                    ServerErrorHandler<string>(res.data.messages[0], dispatch)
                }
            })
            .catch(reason => {
                NetworkErrorHandler(reason, dispatch)
            })
    }
}

