
import {
    AddTodolistActionType, ClearTodolistsActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {LoadType, PreloaderAC} from "./app-reducer";
import {NetworkErrorHandler, ServerErrorHandler} from "../utils/ErrorHandlers";
import {TasksStateType} from "../components/Todolists";



export type SetTasksType = ReturnType<typeof SetTasksAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type ChangeTaskActionType = ReturnType<typeof changeTaskAC>
export type SetTaskStatusActionType = ReturnType<typeof SetTaskStatusAC>


type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksType
    | SetTaskStatusActionType
    | ClearTodolistsActionType

const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.TodolistID];
            stateCopy[action.TodolistID] = tasks.filter(f => f.id !== action.taskID);
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            stateCopy[action.task.todoListId] = [action.task, ...tasks];
            return stateCopy;
        }

        case 'CHANGE-TASK': {
            return {
                ...state, [action.model.todoListId]: state[action.model.todoListId]
                    .map(t => t.id === action.model.id ? {...t, ...action.model} : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistID]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.TodolistID] = action.Tasks
            return stateCopy
        }

        case "Task/SET-STATUS":{
            return {
                ...state,[action.payload.todolistId]:
                    state[action.payload.todolistId].map(t=>t.id === action.payload.id ? {...t,entityStatus:action.payload.status}:t)
            }
        }
        case "CLEAR-TODOLIST":{
            return {}
        }

        default:
            return state;
    }
}

export const removeTaskAC = (TodolistID: string, taskID: string) => {
    return {type: 'REMOVE-TASK', TodolistID, taskID} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const changeTaskAC = (model: TaskType) => {
    return {type: 'CHANGE-TASK', model} as const
}

export const SetTasksAC = (Tasks: TaskType[], TodolistID: string) => {
    return {type: 'SET-TASKS', Tasks, TodolistID} as const
}
export const SetTaskStatusAC = (todolistId:string,id: string, status: LoadType) => {
    return {type: 'Task/SET-STATUS', payload: {todolistId,id, status}} as const
}



export const SetTasksTC = (TodolistID: string) => {
    return (dispatch: Dispatch) => {
        dispatch(PreloaderAC({status:'loading'}))
        todolistsAPI.getTasks(TodolistID)
            .then((res) => {
                if (res.data.error) {
                    ServerErrorHandler<string>(res.data.error, dispatch)
                } else {
                    dispatch(SetTasksAC(res.data.items, TodolistID))
                    dispatch(PreloaderAC({status:'succeed'}))
                }
            })
            .catch((reason) => {
                NetworkErrorHandler(reason, dispatch)
            })
    }
}



export const AddTaskTC = (title: string, TodolistID: string) => {
    return (dispatch: Dispatch) => {
        dispatch(PreloaderAC({status:'loading'}))
        todolistsAPI.createTask(TodolistID, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                    dispatch(PreloaderAC({status:'succeed'}))
                } else {
                    ServerErrorHandler<string>(res.data.messages[0], dispatch)
                }
            })
            .catch((reason) => {
                NetworkErrorHandler(reason, dispatch)
            })


    }
}
export const DeleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(PreloaderAC({status:'loading'}))
        dispatch(SetTaskStatusAC(todolistId,taskId,'loading'))
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(todolistId, taskId))
                    dispatch(PreloaderAC({status:'succeed'}))
                } else {
                    ServerErrorHandler<string>(res.data.messages[0],dispatch)
                }
                dispatch(SetTaskStatusAC(todolistId,taskId,'idle'))
            })
            .catch((reason) => {
                NetworkErrorHandler(reason, dispatch)
            })
    }
}
export type UpdateTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const UpdateTaskTC = (id: string, todolistId: string, value: UpdateTaskType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(PreloaderAC({status:'loading'}))
        dispatch(SetTaskStatusAC(todolistId,id,'loading'))
        const task = getState().tasks[todolistId].find(t => t.id === id)
        if (task) {
            const model = {
                ...task,
                ...value
            }
            todolistsAPI.updateTask(todolistId, id, model)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(changeTaskAC(res.data.data.item))
                        dispatch(PreloaderAC({status:'idle'}))
                    } else {
                        ServerErrorHandler<string>(res.data.messages[0], dispatch)
                    }
                    dispatch(SetTaskStatusAC(todolistId,id,'idle'))
                })
                .catch((reason) => {
                    NetworkErrorHandler(reason, dispatch)
                })

        }
    }
}



