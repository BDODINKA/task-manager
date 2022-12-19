import React, {useEffect} from 'react'
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {InitializeAppTC} from "./app-reducer";
import {CircularProgress} from "@mui/material";
import {Auth, ErrorComponent, Header, selectorIsInitialize, Todolists, useAppDispatch, useAppSelector} from './index';




function App() {
    const dispatch = useAppDispatch()
    const isInitialize = useAppSelector(selectorIsInitialize)

    useEffect(() => {
        dispatch(InitializeAppTC())
    }, [dispatch])



    if (!isInitialize) {
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
                    <Route path={'/Auth'} element={<Auth/>}/>
                    <Route path={'/404'} element={<h1>404:Page not Found</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                    <Route path={'/'} element={<Todolists/>}/>
                </Routes>
            </BrowserRouter>
            <ErrorComponent />
        </div>
    );
}

export default App;
