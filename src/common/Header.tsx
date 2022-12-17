import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import {LogoutTC} from "../features/Auth/auth-reducer";
import {useAppDispatch} from "../utils/hooks/useAppDispatch";
import {useAppSelector} from "../utils/hooks/useAppSelector";
import {selectorIsLoading, selectorIsLogin} from "./selectors/selectorsAll";


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
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    News
                </Typography>
                {isLogin && <Button color="inherit" onClick={LogoutHandler}>LogOut</Button>}
            </Toolbar>
            {loading === 'loading' && <LinearProgress/>}
        </AppBar>
    );
};
