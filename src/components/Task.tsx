import React, {ChangeEvent, useCallback} from 'react'
import {EditableSpan} from './EditableSpan'
import {Delete} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses, TaskType} from '../api/todolists-api'
import {UpdateTaskType} from "../state/tasks-reducer";
import {LoadType} from "../state/app-reducer";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTask: (id: string, todolistId: string, value: UpdateTaskType) => void
    entityStatus:LoadType
}
export const Task = React.memo((props: TaskPropsType) => {
    const {todolistId, task, removeTask, changeTask}: TaskPropsType = props
    const {id}: TaskType = task
    const onClickHandler = useCallback(() => {
        removeTask(id, todolistId)
    }, [id, todolistId, removeTask]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        const status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
        changeTask(id, todolistId, {status})
    }, [id, todolistId, changeTask]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTask(id, todolistId, {title: newValue})
    }, [id, todolistId, changeTask]);

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
            disabled={props.entityStatus === 'loading'}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} entityStatus={props.entityStatus}/>
        <IconButton onClick={onClickHandler} disabled={props.entityStatus === 'loading'}>
            <Delete/>
        </IconButton>
    </div>
})
