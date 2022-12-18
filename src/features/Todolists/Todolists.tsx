import React, {useCallback, useEffect} from 'react';
import {
    AddItemForm,
    AllTodosActions,
    selectorIsLogin,
    selectorTodolists,
    TaskType,
    useActionCreators,
    useAppSelector,
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



    const {AddTodolistsTC, SetTodolistsTC} = useActionCreators(AllTodosActions.AsyncTodoActions)

    useEffect(() => {
        if (!isLogin) {
            return
        }
        SetTodolistsTC()
    }, [isLogin])

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
                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist todo={tl}/>
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </Container>

    );
};