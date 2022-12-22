import React, {useCallback} from 'react'

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Delete from '@mui/icons-material/Delete';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import {Task} from './Task/Task'
import {AllTodosActions, EditableSpan} from "./Task";

import {
    AddItemForm,
    FilterValuesType,
    selectorTasks,
    TaskStatuses,
    TodolistDomainType,
    useActionCreators,
    useAppSelector
} from "./index";
import Paper from "@mui/material/Paper";


type PropsType = {
    todo: TodolistDomainType
}

export const Todolist = (props: PropsType) => {
    const tasks = useAppSelector(selectorTasks)
    const {id, title, filter, entityStatus} = props.todo
    const actions = {...AllTodosActions.AsyncTodoActions, ...AllTodosActions.AsyncTaskActions, ...AllTodosActions.TodoActions}

    const {DeleteTodolistTC, ChangeTodolistTitleTC, AddTaskTC, changeTodolistFilterAC} = useActionCreators(actions)

    const addTaskCallBack = useCallback((title: string) => {
        AddTaskTC({title, TodolistID: id})
    }, [AddTaskTC, id])

    const removeTodolistHandler = () => {
        DeleteTodolistTC({id})
    }
    const changeTodolistTitleHandler = useCallback((title: string) => {
        ChangeTodolistTitleTC({id, title})
    }, [id, ChangeTodolistTitleTC])


    const onAllClickHandler = useCallback((filter: FilterValuesType) => changeTodolistFilterAC({
        filter,
        id
    }), [id, changeTodolistFilterAC])


    let tasksForTodolist = tasks[id]

    if (filter === 'active') {
        tasksForTodolist = tasks[id].filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks[id].filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <Paper>
            <Typography variant={'h3'}>
                <EditableSpan value={title} onChange={changeTodolistTitleHandler} entityStatus={entityStatus}/>
                <IconButton
                    onClick={removeTodolistHandler}
                    disabled={entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </Typography>
            <Grid item xs={1}>
                <AddItemForm addItem={addTaskCallBack} entityStatus={entityStatus}/>
            </Grid>
            {
                tasksForTodolist.map(t =>
                    <Task
                        key={t.id} task={t} todolistId={id}
                    />)
            }
            <ButtonGroup>
                <Button onClick={() => onAllClickHandler('all')}>
                    All
                </Button>
                <Button onClick={() => onAllClickHandler('active')}>
                    Active
                </Button>
                <Button onClick={() => onAllClickHandler('completed')}>
                    Completed
                </Button>
            </ButtonGroup>
        </Paper>
    )
}


