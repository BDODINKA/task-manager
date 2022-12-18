import React, {useCallback} from 'react'

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Delete from '@mui/icons-material/Delete';
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

type PropsType = {
    todo: TodolistDomainType
}

export const Todolist = React.memo(function (props: PropsType) {
    const tasks = useAppSelector(selectorTasks)
    const {id, title,filter,entityStatus} = props.todo
    const actions = {...AllTodosActions.AsyncTodoActions, ...AllTodosActions.AsyncTaskActions, ...AllTodosActions.TodoActions}

    const {DeleteTodolistTC, ChangeTodolistTitleTC, AddTaskTC, changeTodolistFilterAC} = useActionCreators(actions)

    console.log('Todolist called')


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

    return <div>
        <h3>
            <EditableSpan value={title} onChange={changeTodolistTitleHandler} entityStatus={entityStatus}/>
            <IconButton
                onClick={removeTodolistHandler}
                disabled={entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskCallBack} entityStatus={entityStatus}/>
        <div>
            {
                tasksForTodolist.map(t =>
                    <Task
                        key={t.id} task={t} todolistId={id}
                    />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={() => onAllClickHandler('all')}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={() => onAllClickHandler('active')}
                    color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={() => onAllClickHandler('completed')}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


