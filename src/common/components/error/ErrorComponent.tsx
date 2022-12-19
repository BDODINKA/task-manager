import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {ErrorAC} from "../../../app/app-reducer";
import {useAppDispatch} from "../../../utils/hooks/useAppDispatch";
import {useAppSelector} from "../../../utils/hooks/useAppSelector";
import {selectorErrorMessage} from "../../selectors/selectorsAll";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const ErrorComponent = () => {
    const dispatch = useAppDispatch()
    const errorMessage = useAppSelector(selectorErrorMessage)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(ErrorAC({error:null}))
    };

    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            {/*<Alert severity="error">This is an error message!</Alert>*/}
            {/*<Alert severity="warning">This is a warning message!</Alert>*/}
            {/*<Alert severity="info">This is an information message!</Alert>*/}
            {/*<Alert severity="success">This is a success message!</Alert>*/}
        </Stack>
    );
}
