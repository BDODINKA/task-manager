import React, {useCallback, useEffect} from 'react';
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../common/components/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist";
import Container from "@mui/material/Container";
import {
    AddTodolistsTC,
    changeTodolistFilterAC,
    ChangeTodolistTitleTC,
    DeleteTodolistTC,
    FilterValuesType,
    SetTodolistsTC
} from "./todolists-reducer";
import {AddTaskTC, DeleteTaskTC, UpdateTaskTC, UpdateTaskType} from "./Task/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {TaskType} from "../../api/todolists-api";
import {Navigate} from 'react-router-dom';
import {selectorIsLogin, selectorTasks, selectorTodolists} from "../../common/selectors/selectorsAll";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const Todolists = () => {

    const isLogin = useSelector(selectorIsLogin)
    const todolists = useSelector(selectorTodolists)
    const tasks = useSelector(selectorTasks)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLogin){
            return
        }
        dispatch(SetTodolistsTC())
    }, [dispatch,isLogin])




    const removeTask = useCallback(function (taskId: string, todolistId: string) {
        dispatch(DeleteTaskTC({todolistId, taskId}));
    }, [dispatch]);

    const addTask = useCallback(function (title: string, TodolistID: string) {
        dispatch(AddTaskTC({title, TodolistID}));
    }, [dispatch]);

    const changeTask = useCallback(function (id: string, todolistId: string, value: UpdateTaskType) {
        dispatch(UpdateTaskTC({id, todolistId, value}));
    }, [dispatch]);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC({id:todolistId,filter: value});
        dispatch(action);
    }, [dispatch]);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(DeleteTodolistTC(id));
    }, [dispatch]);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(ChangeTodolistTitleTC({id, title}));
    }, [dispatch]);

    const addTodolist = useCallback((title: string) => {
        dispatch(AddTodolistsTC(title));
    }, [dispatch]);

    if (!isLogin){
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
            </Container >

    );
};

export default Todolists;