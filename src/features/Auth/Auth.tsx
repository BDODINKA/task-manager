import React from 'react'
import {Navigate} from 'react-router-dom';

import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {useFormik} from "formik";
import {useSelector} from "react-redux";

import {LoginTC, selectorIsLogin, useAppDispatch,themeAuth} from "./index";
import {ThemeProvider} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Auth = () => {
    const isLogin = useSelector(selectorIsLogin)

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 3 || values.password.length > 16) {
                errors.password = "Password should be more 3 but not more 16 symbols"
            }
            return errors
        },
        onSubmit: values => {
            dispatch(LoginTC(values))
            formik.resetForm()
        },
    })





    if (isLogin) {
        return <Navigate to={'/'}/>
    }

    return (
        <ThemeProvider theme={themeAuth}>
            <Container>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <Typography variant="h2"> Use common test account credentials:</Typography>
                            <Typography variant="h4"><strong>Email: </strong>free@samuraijs.com</Typography>
                            <Typography variant="h4"><strong>Password: </strong>free</Typography>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email"
                                       margin="normal"
                                       {...formik.getFieldProps('email')}
                                       helperText={formik.touched.email && formik.errors.email && formik.errors.email}
                            />
                            <TextField type="password"
                                       label="Password"
                                       margin="normal"
                                       {...formik.getFieldProps('password')}
                                       helperText={formik.touched.password && formik.errors.password && formik.errors.password}
                            />
                            <FormControlLabel
                                label={'Remember me'}
                                control={<Checkbox/>}
                                name="rememberMe"
                                onChange={formik.handleChange}
                                checked={formik.values.rememberMe}
                            />
                            <Button type={'submit'} disabled={!!formik.errors.password || !!formik.errors.email}>Login</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Container>
        </ThemeProvider>
    )
}