import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {LoadType, PreloaderAC} from "./app-reducer";
import {NetworkErrorHandler, ServerErrorHandler} from "../utils/ErrorHandlers";
import {TasksStateType} from "../components/Todolists";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistAC, removeTodolistAC, SetTodolistsAC} from "./todolists-reducer";





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

const slice= createSlice({
    name:'TASKS',
    initialState,
    reducers:{
        removeTaskAC:(state:TasksStateType,action:PayloadAction<{TodolistID: string, taskID: string}>) => {

            const todo = state[action.payload.TodolistID]
            const task = todo.findIndex(t=>t.id === action.payload.taskID)
            if(task > -1){
                console.log(task)
                state[action.payload.TodolistID].splice(task,1)
            }
        },
        addTaskAC:(state:TasksStateType,action:PayloadAction<{task: TaskType,TodolistID:string}>) => {
            const todo = state[action.payload.TodolistID]
            if(todo){
                todo.unshift(action.payload.task)
            }
        },
        changeTaskAC:(state:TasksStateType,action:PayloadAction<{model: TaskType}>) => {
            const todo = state[action.payload.model.todoListId]
            const task = todo.findIndex(t=>t.id === action.payload.model.id)
            if(task > -1){
                todo[task] = action.payload.model
            }
        },
        SetTasksAC:(state:TasksStateType,action:PayloadAction<{Tasks: TaskType[], TodolistID: string}>) => {
            state[action.payload.TodolistID] = action.payload.Tasks
        },
        SetTaskStatusAC:(state:TasksStateType,action:PayloadAction<{todolistId:string,id: string, status: LoadType}>) => {
            const todo = state[action.payload.todolistId]
            const task = todo.findIndex(t=>t.id === action.payload.id)
            if(task > -1){
                todo[task].entityStatus = action.payload.status
            }
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(addTodolistAC,(state:TasksStateType,action)=>{
            state[action.payload.todolistID] = []
            }
        );
        builder.addCase(removeTodolistAC,(state:TasksStateType,action)=>{
            delete state[action.payload.todolistId];
            }
        );
        builder.addCase(SetTodolistsAC,(state:TasksStateType,action)=>{
            action.payload.todolists.forEach((tl) => {
                state[tl.id] = []
            })
            }
        );
    }
})
export const tasksReducer = slice.reducer

export const {removeTaskAC ,addTaskAC ,changeTaskAC ,SetTasksAC,SetTaskStatusAC} = slice.actions


export const SetTasksTC = (TodolistID: string) => {
    return (dispatch: Dispatch) => {
        dispatch(PreloaderAC({status:'loading'}))
        todolistsAPI.getTasks(TodolistID)
            .then((res) => {
                if (res.data.error) {
                    ServerErrorHandler<string>(res.data.error, dispatch)
                } else {
                    dispatch(SetTasksAC({Tasks:res.data.items,TodolistID}))
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
                    dispatch(addTaskAC({task:res.data.data.item,TodolistID}))
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
        dispatch(SetTaskStatusAC({todolistId,id:taskId,status:'loading'}))
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC({TodolistID:todolistId,taskID:taskId}))
                    dispatch(PreloaderAC({status:'succeed'}))
                } else {
                    ServerErrorHandler<string>(res.data.messages[0],dispatch)
                }
                dispatch(SetTaskStatusAC({todolistId,id:taskId,status:'idle'}))
            })
            .catch((reason) => {
                console.log(reason)
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
        dispatch(SetTaskStatusAC({todolistId,id,status:'loading'}))
        const task = getState().tasks[todolistId].find(t => t.id === id)
        if (task) {
            const model = {
                ...task,
                ...value
            }
            todolistsAPI.updateTask(todolistId, id, model)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(changeTaskAC({model:res.data.data.item}))
                        dispatch(PreloaderAC({status:'idle'}))
                    } else {
                        ServerErrorHandler<string>(res.data.messages[0], dispatch)
                    }
                    dispatch(SetTaskStatusAC({todolistId,id,status:'idle'}))
                })
                .catch((reason) => {
                    NetworkErrorHandler(reason, dispatch)
                })

        }
    }
}



