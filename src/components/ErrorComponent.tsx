import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {ErrorAC, LoadStateType} from "../state/app-reducer";
import {useDispatch} from "react-redux";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
type ResponseType = {
    Load:LoadStateType
}

export const ErrorComponent = (props: ResponseType) => {
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(ErrorAC({error:null}))
    };

    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            <Snackbar open={!!props.Load.ErrorMessage} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {props.Load.ErrorMessage}
                </Alert>
            </Snackbar>
            {/*<Alert severity="error">This is an error message!</Alert>*/}
            {/*<Alert severity="warning">This is a warning message!</Alert>*/}
            {/*<Alert severity="info">This is an information message!</Alert>*/}
            {/*<Alert severity="success">This is a success message!</Alert>*/}
        </Stack>
    );
}
