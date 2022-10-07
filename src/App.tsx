import React, {useEffect} from 'react'
import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {ErrorComponent} from "./components/ErrorComponent";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Todolists from "./components/Todolists";
import {Login} from "./components/Login";
import {InitializeAppTC, LoadStateType} from "./state/app-reducer";
import {CircularProgress} from "@mui/material";
import {Header} from "./components/Header";


function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(InitializeAppTC())
    }, [dispatch])

    const Load = useSelector<AppRootStateType, LoadStateType>(state => state.app)

    if (!Load.isInitialize) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path={'/Login'} element={<Login/>}/>
                    <Route path={'/404'} element={<h1>404:Page not Found</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                    <Route path={'/'} element={<Todolists/>}/>
                </Routes>
            </BrowserRouter>
            <ErrorComponent Load={Load}/>
        </div>
    );
}

export default App;
