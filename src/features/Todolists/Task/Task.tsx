import React, {ChangeEvent, useCallback} from 'react'
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import {AllTodosActions, EditableSpan, TaskStatuses, TaskType} from "./index";
import {useActionCreators} from "../../../utils/hooks/useActionCreators";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const {todolistId, task} = props
    const {id,status,title,entityStatus}: TaskType = task

    const {DeleteTaskTC, UpdateTaskTC} = useActionCreators(AllTodosActions.AsyncTaskActions)


    const onClickHandler = useCallback(() => {
        DeleteTaskTC({taskId: id, todolistId})
    }, [id, todolistId, DeleteTaskTC]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        const status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
        UpdateTaskTC({id, todolistId, value: {status}})
    }, [id, todolistId, UpdateTaskTC]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        UpdateTaskTC({id, todolistId, value: {title: newValue}})
    }, [id, todolistId, UpdateTaskTC]);

    return <div key={id} className={status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
            disabled={entityStatus === 'loading'}
        />

        <EditableSpan value={title} onChange={onTitleChangeHandler} entityStatus={entityStatus}/>

        <IconButton onClick={onClickHandler} disabled={entityStatus === 'loading'}>
            <Delete/>
        </IconButton>
    </div>
})
