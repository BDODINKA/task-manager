import React, {ChangeEvent, useCallback} from 'react'
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import {AllTodosActions, EditableSpan, TaskStatuses, TaskType,useActionCreators} from "./index";
import Grid from "@mui/material/Grid";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const {todolistId, task} = props
    const {id,status,title,entityStatus}: TaskType = task

    const {DeleteTaskTC, UpdateTaskTC} = useActionCreators(AllTodosActions.AsyncTaskActions)


    const deleteTaskHandler = () => {
        DeleteTaskTC({taskId: id, todolistId})
    };

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        const status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
        UpdateTaskTC({id, todolistId, value: {status}})
    }, [id, todolistId, UpdateTaskTC]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        UpdateTaskTC({id, todolistId, value: {title: newValue}})
    }, [id, todolistId, UpdateTaskTC]);

    return <Grid item xs={2} key={id} className={status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
            disabled={entityStatus === 'loading'}
        />
        <EditableSpan value={title} onChange={onTitleChangeHandler} entityStatus={entityStatus}/>
        <IconButton onClick={deleteTaskHandler} disabled={entityStatus === 'loading'}>
            <Delete/>
        </IconButton>
    </Grid>
})
