import React, {useCallback, useEffect} from 'react';
import {
    AddItemForm,
    selectorIsLogin,
    selectorTasks,
    selectorTodolists,
    UpdateTaskType,
    useAppSelector,
    TaskType,
    FilterValuesType,
    AllTodosActions,
    useActionCreators,

} from "./index";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist";
import Container from "@mui/material/Container";

import {Navigate} from 'react-router-dom';





export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const Todolists = () => {
    const isLogin = useAppSelector(selectorIsLogin)
    const todolists = useAppSelector(selectorTodolists)
    const tasks = useAppSelector(selectorTasks)


    const actions = {...AllTodosActions.AsyncTodoActions,...AllTodosActions.TodoActions,...AllTodosActions.TaskActions,...AllTodosActions.AsyncTaskActions}

    const {DeleteTaskTC,AddTaskTC,UpdateTaskTC,AddTodolistsTC,changeTodolistFilterAC,ChangeTodolistTitleTC,
    DeleteTodolistTC,SetTodolistsTC} = useActionCreators(actions)


    useEffect(() => {
        if (!isLogin) {
            return
        }
        SetTodolistsTC()
    }, [isLogin])


    const removeTask = useCallback(function (taskId: string, todolistId: string) {
        DeleteTaskTC({todolistId, taskId})
    }, []);

    const addTask = useCallback(function (title: string, TodolistID: string) {
        AddTaskTC({title, TodolistID});
    }, []);

    const changeTask = useCallback(function (id: string, todolistId: string, value: UpdateTaskType) {
        UpdateTaskTC({id, todolistId, value});
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        changeTodolistFilterAC({id: todolistId, filter: value});
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        DeleteTodolistTC({id});
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        ChangeTodolistTitleTC({id, title});
    }, []);

    const addTodolist = useCallback((title: string) => {
        AddTodolistsTC({title});
    }, []);

    if (!isLogin) {
        return <Navigate to={'/Auth'}/>
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
        </Container>

    );
};
