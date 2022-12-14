import React, {useCallback, useEffect} from 'react';
import Grid from "@mui/material/Grid";
import {AddItemForm} from "./AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist";
import Container from "@mui/material/Container";
import {
    AddTodolistsTC,
    changeTodolistFilterAC, ChangeTodolistTitleTC,
    DeleteTodolistTC,
    FilterValuesType,
    SetTodolistsTC,
    TodolistDomainType
} from "../state/todolists-reducer";
import {AddTaskTC, DeleteTaskTC, UpdateTaskTC, UpdateTaskType} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TaskType} from "../api/todolists-api";
import { Navigate } from 'react-router-dom';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const Todolists = () => {

    const isLogin = useSelector<AppRootStateType>(state => state.auth.isLogin)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLogin){
            return
        }
        dispatch(SetTodolistsTC())
    }, [dispatch,isLogin])

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
        const action = changeTodolistFilterAC({id:todolistId,filter: value});
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

    if (!isLogin){
        return <Navigate to={'/Login'}/>
    }
    return (
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        entityStatus={tl.entityStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTask={changeTask}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container >

    );
};

export default Todolists;