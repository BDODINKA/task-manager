import React, {ChangeEvent, useCallback} from 'react'
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import {AllTodosActions, EditableSpan, LoadType, TaskStatuses, TaskType} from "./index";
import {useActionCreators} from "../../../utils/hooks/useActionCreators";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    entityStatus:LoadType
}

export const Task = React.memo((props: TaskPropsType) => {
    const {todolistId, task}: TaskPropsType = props
    const {id}: TaskType = task

    const {DeleteTaskTC,UpdateTaskTC} =useActionCreators(AllTodosActions.AsyncTaskActions)


    const onClickHandler = useCallback(() => {
        DeleteTaskTC({taskId:id,todolistId})
    }, [id, todolistId, DeleteTaskTC]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        const status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
        UpdateTaskTC({id,todolistId,value:{status}})
    }, [id, todolistId, UpdateTaskTC]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        UpdateTaskTC({id,todolistId,value:{title:newValue}})
    }, [id, todolistId, UpdateTaskTC]);

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
