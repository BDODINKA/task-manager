import {TaskPriorities, TaskStatuses, todolistsAPI} from '../../../api/todolists-api'
import {AppRootStateType} from "../../../app/store";
import {LoadType, PreloaderAC} from "../../../app/app-reducer";
import {NetworkErrorHandler, ServerErrorHandler} from "../../../utils/ErrorHandlers";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AddTodolistsTC, DeleteTodolistTC, SetTodolistsTC} from "../todolists-reducer";
import {AxiosError} from "axios";
import {TasksStateType} from "../Todolists";

export type UpdateTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

// const initialState: TasksStateType = {
//     /*"todolistId1": [
//         { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
//             startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
//         { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
//             startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
//         { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
//             startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
//     ],
//     "todolistId2": [
//         { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
//             startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
//         { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
//             startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
//         { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
//             startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
//     ]*/
// }

export const SetTasksTC = createAsyncThunk('TASKS/SET-TASKS', async (TodolistID: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(PreloaderAC({status: 'loading'}))
    const res = await todolistsAPI.getTasks(TodolistID)
    try {
        if (res.data.error) {
            ServerErrorHandler<string>(res.data.error, dispatch)
            return rejectWithValue(res.data.error)
        } else {
            dispatch(PreloaderAC({status: 'succeed'}))
            return {Tasks: res.data.items, TodolistID}
        }
    } catch (reason) {
        NetworkErrorHandler(reason as AxiosError, dispatch)
        return rejectWithValue(reason)
    }
})

export const AddTaskTC = createAsyncThunk('TASKS/ADD-TASKS', async (arg: { title: string, TodolistID: string }, {
    dispatch,
    rejectWithValue
}) => {
    const {title, TodolistID} = arg
    dispatch(PreloaderAC({status: 'loading'}))
    const res = await todolistsAPI.createTask(TodolistID, title)
    try {
        if (res.data.resultCode === 0) {
            dispatch(PreloaderAC({status: 'succeed'}))
            return {task: res.data.data.item, TodolistID}
        } else {
            ServerErrorHandler<string>(res.data.messages[0], dispatch)
            return rejectWithValue(res.data.messages[0])
        }
    } catch (reason) {
        NetworkErrorHandler(reason as AxiosError, dispatch)
        return rejectWithValue(reason)
    }
})

export const DeleteTaskTC = createAsyncThunk('TASKS/DELETE-TASK', async (arg: { todolistId: string, taskId: string }, {
    dispatch,
    rejectWithValue
}) => {
    const {taskId, todolistId} = arg
    dispatch(PreloaderAC({status: 'loading'}))
    dispatch(SetTaskStatusAC({todolistId, id: taskId, status: 'loading'}))
    const res = await todolistsAPI.deleteTask(todolistId, taskId)
    try {
        if (res.data.resultCode === 0) {
            dispatch(PreloaderAC({status: 'succeed'}))
            dispatch(SetTaskStatusAC({todolistId, id: taskId, status: 'idle'}))
            return {todolistId, taskId}
        } else {
            ServerErrorHandler<string>(res.data.messages[0], dispatch)
            dispatch(SetTaskStatusAC({todolistId, id: taskId, status: 'idle'}))
            return rejectWithValue(res.data.messages[0])
        }
    } catch (reason) {
        NetworkErrorHandler(reason as AxiosError, dispatch)
        return rejectWithValue(reason)
    }
})

export const UpdateTaskTC = createAsyncThunk('TASKS/UPDATE-TASK', async (arg: { id: string, todolistId: string, value: UpdateTaskType }, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    const {id, todolistId, value} = arg
    dispatch(PreloaderAC({status: 'loading'}))
    dispatch(SetTaskStatusAC({todolistId, id, status: 'loading'}))
    const state = getState() as AppRootStateType
    const task = state.tasks[todolistId].find(t => t.id === id)
    if (task) {
        const model = {
            ...task,
            ...value
        }
        const res = await todolistsAPI.updateTask(todolistId, id, model)
        try {
            if (res.data.resultCode === 0) {
                dispatch(PreloaderAC({status: 'idle'}))
                dispatch(SetTaskStatusAC({todolistId, id, status: 'idle'}))
                return {model: res.data.data.item}
            } else {
                ServerErrorHandler<string>(res.data.messages[0], dispatch)
                dispatch(SetTaskStatusAC({todolistId, id, status: 'idle'}))

                return rejectWithValue(res.data.messages[0])
            }

        } catch (reason) {
            NetworkErrorHandler(reason as AxiosError, dispatch)
            return rejectWithValue(reason)
        }
    }
})


const slice = createSlice({
    name: 'TASKS',
    initialState: {} as TasksStateType,
    reducers: {
        SetTaskStatusAC: (state, action: PayloadAction<{ todolistId: string, id: string, status: LoadType }>) => {
            const todo = state[action.payload.todolistId]
            const task = todo.findIndex(t => t.id === action.payload.id)
            if (task > -1) {
                todo[task].entityStatus = action.payload.status
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(AddTodolistsTC.fulfilled, (state, action) => {
            state[action.payload.todolistID] = []
        });

        builder.addCase(DeleteTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.todolistId];
        });

        builder.addCase(SetTodolistsTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl) => {
                state[tl.id] = []
            })
        });

        builder.addCase(SetTasksTC.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.TodolistID] = action.payload.Tasks
            }
        });

        builder.addCase(AddTaskTC.fulfilled, (state, action) => {
            const todo = state[action.payload.TodolistID]
            if (todo) {
                todo.unshift(action.payload.task)
            }
        });

        builder.addCase(DeleteTaskTC.fulfilled, (state, action) => {
            const todo = state[action.payload.todolistId]
            const task = todo.findIndex(t => t.id === action.payload.taskId)
            if (task > -1) {
                state[action.payload.todolistId].splice(task, 1)
            }
        });

        builder.addCase(UpdateTaskTC.fulfilled, (state, action) => {
            if (action.payload) {
                const todo = state[action.payload.model.todoListId]
                const task = todo.findIndex(t => t.id === action.payload?.model.id)
                if (task > -1) {
                    todo[task] = action.payload.model
                }
            }
        });
    }
})

export const tasksReducer = slice.reducer

export const {SetTaskStatusAC} = slice.actions








