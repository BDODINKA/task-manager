import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import {LogoutTC,useAppDispatch,useAppSelector,selectorIsLoading, selectorIsLogin} from "./index";


export const Header = () => {
    const loading = useAppSelector(selectorIsLoading)
    const isLogin = useAppSelector(selectorIsLogin)
    const dispatch = useAppDispatch()

    const LogoutHandler = () => {
        dispatch(LogoutTC())
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4">
                    Todolist
                </Typography>
                {isLogin && <Button color="inherit" onClick={LogoutHandler}>LogOut</Button>}
            </Toolbar>
            {loading === 'loading' && <LinearProgress/>}
        </AppBar>
    );
};
