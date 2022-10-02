import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


export type SetTasksType = ReturnType<typeof SetTasksAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksType

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
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t);
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);
            return ({...state});
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
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const
}

export const SetTasksAC = (Tasks: TaskType[], TodolistID: string) => {
    return {type: 'SET-TASKS', Tasks, TodolistID} as const
}

export const SetTasksTC = (TodolistID: string) => {
    return (dispath: Dispatch) => {
        todolistsAPI.getTasks(TodolistID)
            .then((res) => dispath(SetTasksAC(res.data.items, TodolistID)))
    }
}
export const AddTaskTC = (title: string, TodolistID: string) => {
    return (dispath: Dispatch) => {
        todolistsAPI.createTask(TodolistID, title)
            .then((res) => dispath(addTaskAC(res.data.data.item)))
    }
}
export const DeleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispath: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(() => dispath(removeTaskAC(todolistId, taskId)))
    }
}
export const UpdateTaskStatusTC = (id: string, status: TaskStatuses, todolistId: string) => {
    return (dispath: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === id)
        if (task)
            todolistsAPI.updateTask(todolistId, id,
                {
                    title: task.title,
                    startDate: task.startDate,
                    priority: task.priority,
                    description: task.description,
                    deadline: task.deadline,
                    status: status
                })
                .then(() => dispath(changeTaskStatusAC(id, status, todolistId)))

    }
}
export const ChangeTaskTitleTC = (id: string, newTitle: string, todolistId: string) => {
    return (dispath: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === id)
        if (task)
            todolistsAPI.updateTask(todolistId, id, {
                title: newTitle,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            })
                .then(() => dispath(changeTaskTitleAC(id, newTitle, todolistId)))
    }
}


