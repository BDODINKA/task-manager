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

import {LoginTC, selectorIsLogin, themeAuth, useAppDispatch} from "./index";
import {ThemeProvider} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {selectorIsLoading} from "../../common/selectors/selectorsAll";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Auth = () => {
    const isLogin = useSelector(selectorIsLogin)
    const isLoading = useSelector(selectorIsLoading)

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

    const disabledRulesBtn = !!formik.errors.password || !!formik.errors.email || formik.values.email === '' || formik.values.password === '' || isLoading === 'loading'
    let isIos = false

    if (isLogin) {
        return <Navigate to={'/'}/>
    }

    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        isIos = true
    }

    return (
        <ThemeProvider theme={themeAuth}>

            <Container>
                {isIos &&
                    <Typography variant="h6">
                        if you are using a device on the iOS operating system, you need to go to the browser settings
                        and turn off Prevent Cross-Site Tracking in the privacy and security tab
                    </Typography>}
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
                            <Button type={'submit'} disabled={disabledRulesBtn}>Login</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Container>
        </ThemeProvider>
    )
}