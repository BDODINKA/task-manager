import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import {LogoutTC, selectorIsLoading, selectorIsLogin, themeHeader, useAppDispatch, useAppSelector} from "./index";
import {ThemeProvider} from "@mui/material";


export const Header = () => {
    const loading = useAppSelector(selectorIsLoading)
    const isLogin = useAppSelector(selectorIsLogin)
    const dispatch = useAppDispatch()

    const LogoutHandler = () => {
        dispatch(LogoutTC())
    }

    return (
        <ThemeProvider theme={themeHeader}>
            <AppBar >
                <Toolbar>
                    <Typography variant="h1">
                        Todolist
                    </Typography>
                    {isLogin && <Button onClick={LogoutHandler}>LogOut</Button>}
                </Toolbar>
                {loading === 'loading' && <LinearProgress/>}
            </AppBar>
        </ThemeProvider>
    );
};
