import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import {AddBox} from '@mui/icons-material';
import {LoadType} from "app/app-reducer";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    entityStatus?:LoadType
}

export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {


    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   label={"Title"}
                   helperText={error}
                   disabled={props.entityStatus === 'loading'}
        />
        <IconButton color="primary"
                    onClick={addItem}
                    disabled={props.entityStatus === "loading"}
        >
            <AddBox/>
        </IconButton>
    </>
})
