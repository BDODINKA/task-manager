import React from 'react';
import Grid from "@mui/material/Grid";
import {AddItemForm} from "./AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist";
import Container from "@mui/material/Container";
import {FilterValuesType, TodolistDomainType} from "../state/todolists-reducer";
import {UpdateTaskType} from "../state/tasks-reducer";
import {TasksStateType} from "../App";

type PropsType = {
    tasks: TasksStateType
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    changeTask: (id: string, todolistId: string, value: UpdateTaskType) => void
    addItem :(title: string)=>void
    todolists:Array<TodolistDomainType>
}

const Todolists = (props:PropsType) => {

    return (

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={props.addItem}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        props.todolists.map(tl => {
                            let allTodolistTasks = props.tasks[tl.id];
                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={props.removeTask}
                                        changeFilter={props.changeFilter}
                                        addTask={props.addTask}
                                        entityStatus={tl.entityStatus}
                                        filter={tl.filter}
                                        removeTodolist={props.removeTodolist}
                                        changeTask={props.changeTask}
                                        changeTodolistTitle={props.changeTodolistTitle}
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