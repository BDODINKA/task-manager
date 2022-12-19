import {AsyncTodoActions, TodoActions} from "./todolists-reducer";
import {AsyncTaskActions, TaskActions} from "./Task/tasks-reducer";

export type {LoadType} from "app/app-reducer";
export type {TaskType, TodolistType} from 'api/todolists-api'
export {TaskStatuses} from 'api/todolists-api'
export type{FilterValuesType} from './todolists-reducer'

export {AddItemForm} from 'common/components/addItemForm/AddItemForm'

export {EditableSpan} from 'common/components/editableSpan/EditableSpan'

export {selectorIsLogin, selectorTasks, selectorTodolists} from "common/selectors/selectorsAll";

export type {UpdateTaskType} from "./Task/tasks-reducer";
export type {TodolistDomainType} from "./todolists-reducer";

export {useAppSelector} from "utils/hooks/useAppSelector";
export {useAppDispatch} from "utils/hooks/useAppDispatch";
export {useActionCreators} from "utils/hooks/useActionCreators";

export {todolistsAPI} from 'api/todolists-api'

export {PreloaderAC} from "app/app-reducer";

export {NetworkErrorHandler, ServerErrorHandler} from "utils/ErrorHandlers";



export const AllTodosActions ={
    AsyncTodoActions,
    TodoActions,
    AsyncTaskActions,
    TaskActions
}

