import React, {ChangeEvent, useCallback} from 'react'
import {EditableSpan} from './EditableSpan'
import {Delete} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses, TaskType} from './api/todolists-api'

type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const {todolistId, task, removeTask, changeTaskStatus, changeTaskTitle}: TaskPropsType = props
    const {id}: TaskType = task
    const onClickHandler = useCallback(() => {
       removeTask(id, todolistId)
    }, [id, todolistId,removeTask]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
       changeTaskStatus(id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId)
    }, [id, todolistId,changeTaskStatus]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
       changeTaskTitle(id, newValue, todolistId)
    }, [id, todolistId,changeTaskTitle]);

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})
