import {
    AllTodosActions,
    LoadType,
    NetworkErrorHandler,
    PreloaderAC,
    ServerErrorHandler,
    todolistsAPI,
    TodolistType
} from "./index";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";


// const initialState: Array<TodolistDomainType> = [
//     /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
//     {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
// ]

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: LoadType
}

const SetTodolistsTC = createAsyncThunk('TODOLISTS/SET-TODOLISTS', async (arg, {dispatch, rejectWithValue}) => {

    dispatch(PreloaderAC({status: 'loading'}))
    const res = await todolistsAPI.getTodolists()
    try {
        dispatch(PreloaderAC({status: 'succeed'}))
        res.data.forEach(tl => dispatch(AllTodosActions.AsyncTaskActions.SetTasksTC(tl.id)))
        return {todolists: res.data}
    } catch (reason) {
        NetworkErrorHandler(reason as AxiosError, dispatch)
        return rejectWithValue(reason)
    }
})

const AddTodolistsTC = createAsyncThunk('TODOLISTS/ADD-TODOLISTS', async (arg:{title: string}, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(PreloaderAC({status: 'loading'}))
    const {title}=arg
    const res = await todolistsAPI.createTodolist(title)
    try {
        if (res.data.resultCode === 0) {
            dispatch(PreloaderAC({status: 'succeed'}))
            return {title: res.data.data.item.title, todolistID: res.data.data.item.id}
        } else {
            ServerErrorHandler<string>(res.data.messages[0], dispatch)
            return rejectWithValue(res.data.messages[0])
        }
    } catch (reason) {
        NetworkErrorHandler(reason as AxiosError, dispatch)
        return rejectWithValue(reason)
    }
})

const ChangeTodolistTitleTC = createAsyncThunk('TODOLISTS/CHANGE-TODOLIST-TITLE', async (arg: { id: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    const {id, title} = arg
    dispatch(PreloaderAC({status: 'loading'}))
    dispatch(SetStatusAC({id, entityStatus: 'loading'}))
    const res = await todolistsAPI.updateTodolist(id, title)
    try {
        if (res.data.resultCode === 0) {
            dispatch(PreloaderAC({status: 'idle'}))
            dispatch(SetStatusAC({id, entityStatus: 'idle'}))
            return {id, title}
        } else {
            ServerErrorHandler<string>(res.data.messages[0], dispatch)
            dispatch(SetStatusAC({id, entityStatus: 'idle'}))
            return rejectWithValue(res.data.messages[0])
        }

    } catch (reason) {
        NetworkErrorHandler(reason as AxiosError, dispatch)
        return rejectWithValue(reason)
    }
})

const DeleteTodolistTC = createAsyncThunk('', async (arg:{id: string}, {dispatch, rejectWithValue}) => {
    const {id}=arg
    dispatch(PreloaderAC({status: 'loading'}))
    dispatch(SetStatusAC({id, entityStatus: "loading"}))
    const res = await todolistsAPI.deleteTodolist(id)
    try {
        if (res.data.resultCode === 0) {
            dispatch(PreloaderAC({status: 'succeed'}))
            return {todolistId: id}
        } else {
            ServerErrorHandler<string>(res.data.messages[0], dispatch)
            return rejectWithValue(res.data.messages[0])
        }
    } catch (reason) {
        NetworkErrorHandler(reason as AxiosError, dispatch)
        return rejectWithValue(reason)
    }
})


const slice = createSlice({
    name: "TODOLISTS",
    initialState: [] as TodolistDomainType[],
    reducers: {
        changeTodolistFilterAC: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
            const todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                todolist.filter = action.payload.filter
            }
            return state
        },
        SetStatusAC: (state, action: PayloadAction<{ id: string, entityStatus: LoadType }>) => {
            const todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                todolist.entityStatus = action.payload.entityStatus
            }
        },
        ClearTodolistsAC: (state, action: PayloadAction<{ value: null }>) => {
            if (action.payload.value) {
                state.push()
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(SetTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "succeed"}))
        })
        builder.addCase(AddTodolistsTC.fulfilled, (state, action) => {
            state.unshift({
                id: action.payload.todolistID,
                title: action.payload.title,
                filter: 'all',
                addedDate: '',
                order: 0,
                entityStatus: "succeed"
            })
        })
        builder.addCase(ChangeTodolistTitleTC.fulfilled, (state, action) => {
            const todolist = state.find(tl => tl.id === action.payload.id);
            if (todolist) {
                todolist.title = action.payload.title
            }
            return state
        })
        builder.addCase(DeleteTodolistTC.fulfilled,(state, action)=>{
                const idx = state.findIndex(tl => tl.id === action.payload.todolistId)
                state.splice(idx, 1)
        })
    }
})

export const todolistsReducer = slice.reducer

export const AsyncTodoActions= {DeleteTodolistTC,SetTodolistsTC,AddTodolistsTC,ChangeTodolistTitleTC};

export const  TodoActions = slice.actions

const {SetStatusAC}=TodoActions





