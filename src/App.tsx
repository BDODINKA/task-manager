import React, {useCallback, useEffect} from 'react'
import './App.css';
// import {Todolist} from './components/Todolist';
// import {AddItemForm} from './components/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
import Menu from '@mui/icons-material/Menu';
import {
    AddTodolistsTC,
    changeTodolistFilterAC,
    ChangeTodolistTitleTC, DeleteTodolistTC,
    FilterValuesType,
    SetTodolistsTC,
    TodolistDomainType
} from './state/todolists-reducer'
import {
    AddTaskTC,
    DeleteTaskTC,
    UpdateTaskTC, UpdateTaskType
} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskType} from './api/todolists-api'
import LinearProgress from '@mui/material/LinearProgress';
import {LoadStateType} from "./state/app-reducer";
import {ErrorComponent} from "./components/ErrorComponent";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Todolists from "./components/Todolists";
import {Login} from "./components/Login";
import {AuthStateType} from "./state/auth-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    const isLogin = useSelector<AppRootStateType, AuthStateType>(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLogin.isLogin) {
            return
        } else {
            dispatch(SetTodolistsTC())
        }
    }, [dispatch, isLogin])

    const Load = useSelector<AppRootStateType, LoadStateType>(state => state.app)
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(DeleteTaskTC(todolistId, id));
    }, [dispatch]);

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(AddTaskTC(title, todolistId));
    }, [dispatch]);

    const changeTask = useCallback(function (id: string, todolistId: string, value: UpdateTaskType) {
        dispatch(UpdateTaskTC(id, todolistId, value));
    }, [dispatch]);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch]);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(DeleteTodolistTC(id));
    }, [dispatch]);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(ChangeTodolistTitleTC(id, title));
    }, [dispatch]);

    const addTodolist = useCallback((title: string) => {
        dispatch(AddTodolistsTC(title));
    }, [dispatch]);


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {Load.loading === 'loading' && <LinearProgress/>}
            </AppBar>
            <BrowserRouter>
                <Routes>
                    <Route path={'/Login'} element={<Login/>}/>
                    <Route path={'/404'} element={<h1>404:Page not Found</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                    <Route path={'/'}
                           element={
                               <Todolists
                                   addItem={addTodolist}
                                   removeTask={removeTask}
                                   changeFilter={changeFilter}
                                   addTask={addTask}
                                   removeTodolist={removeTodolist}
                                   changeTask={changeTask}
                                   changeTodolistTitle={changeTodolistTitle}
                                   tasks={tasks}
                                   todolists={todolists}
                               />
                           }/>
                </Routes>
            </BrowserRouter>
            {/*<Container fixed>*/}
            {/*    <Grid container style={{padding: '20px'}}>*/}
            {/*        <AddItemForm addItem={addTodolist}/>*/}
            {/*    </Grid>*/}
            {/*    <Grid container spacing={3}>*/}
            {/*        {*/}
            {/*            todolists.map(tl => {*/}
            {/*                let allTodolistTasks = tasks[tl.id];*/}
            {/*                return <Grid item key={tl.id}>*/}
            {/*                    <Paper style={{padding: '10px'}}>*/}
            {/*                        <Todolist*/}
            {/*                            id={tl.id}*/}
            {/*                            title={tl.title}*/}
            {/*                            tasks={allTodolistTasks}*/}
            {/*                            removeTask={removeTask}*/}
            {/*                            changeFilter={changeFilter}*/}
            {/*                            addTask={addTask}*/}
            {/*                            entityStatus={tl.entityStatus}*/}
            {/*                            filter={tl.filter}*/}
            {/*                            removeTodolist={removeTodolist}*/}
            {/*                            changeTask={changeTask}*/}
            {/*                            changeTodolistTitle={changeTodolistTitle}*/}
            {/*                        />*/}
            {/*                    </Paper>*/}
            {/*                </Grid>*/}
            {/*            })*/}
            {/*        }*/}
            {/*    </Grid>*/}
            {/*</Container>*/}
            <ErrorComponent Load={Load}/>
        </div>
    );

}

export default App;
