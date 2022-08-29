import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";


export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

export type SetTodolistsActionType = ReturnType<typeof SetTodolistsAC>
export  type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export  type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export  type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
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
                order: 0
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
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
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
    return {type: 'SET-TODOLISTS', todolists} as const
}

export const SetTodolistsTC = () => {
    return (dispath: Dispatch) => {
        todolistsAPI.getTodolists()
            .then((res) => dispath(SetTodolistsAC(res.data)))
    }
}
export const AddTodolistsTC = (title: string) => {
    return (dispath: Dispatch) => {
        todolistsAPI.createTodolist(title)
            .then((res) => dispath(addTodolistAC(res.data.data.item.title, res.data.data.item.id)))
    }
}
export const ChangeTodolistTitleTC = (id: string, title: string) => {
    return (dispath: Dispatch) => {
        todolistsAPI.updateTodolist(id, title)
            .then(() => dispath(changeTodolistTitleAC(id, title)))
    }
}
export const DeleteTodolistTC = (id: string) => {
    return (dispath: Dispatch) => {
        todolistsAPI.deleteTodolist(id)
            .then(() => dispath(removeTodolistAC(id)))
    }
}

