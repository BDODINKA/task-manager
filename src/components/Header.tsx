import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {LoadStateType} from "../state/app-reducer";
import {LogoutTC} from "../state/auth-reducer";


export const Header = () => {
    const Load = useSelector<AppRootStateType, LoadStateType>(state => state.app)
    const isLogin = useSelector<AppRootStateType>(state => state.auth.isLogin)
    const dispatch=useDispatch()

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
                {isLogin  &&  <Button color="inherit" onClick={LogoutHandler}>LogOut</Button>}
            </Toolbar>
            {Load.loading === 'loading' && <LinearProgress/>}
        </AppBar>
    );
};
