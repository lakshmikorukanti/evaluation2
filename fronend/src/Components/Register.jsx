import React from 'react';
import { Formik, Form, useField } from 'formik';
import { Button, TextField, Box } from '@material-ui/core';
import * as yup from 'yup';
import { loginUserSuccess } from '../redux/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
    layout: {
        padding: '30px'
    },
    authPage: {
        margin: 'auto',
        maxWidth: '360px',
        minHeight: '410px',
        background: 'white',
        padding: '60px 40px 40px'
    },
    header: {
        textAlign: 'left',
        fontSize: '20px',
        fontWeight: '500',
        color: '#424553',
        marginBottom: '20px'
    },
    formFields: {
        marginBottom: '10px',
        '& > *': {
            fontSize: '12px'
        }
    },
    radio: {
        fontSize: '12px',
        '& > *': {
            fontSize: '12px'
        }
    },
    button: {
        marginTop: '20px'
    },
    formControl: {
        width: '100%',
        marginBottom: '10px',
        fontSize: '12px',
        margin: 0
    },
    select: {
        textAlign: 'left',
        padding: 0,
        margin: 0,
        marginTop: 0
    },
    inputLabel: {
        fontSize: '12px',
        padding: 0,
        margin: 0
    }
});

const MyTextField = ({ placeholder, label, InputLabelProps, InputProps, required, type, ...props }) => {
    const [ field, meta ] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    const classes = useStyles(props);
    return (
        <TextField
            placeholder={placeholder}
            label={label}
            className={classes.formFields}
            size="small"
            InputLabelProps={{
                style: {
                    fontSize: 12
                },
                width: '100%'
            }}
            InputProps={{
                style: {
                    fontSize: 12
                }
            }}
            required={required}
            fullWidth={true}
            {...field}
            helperText={errorText}
            error={!!errorText}
            type={type}
            variant="outlined"
        />
    );
};

const validationSchema = yup.object({
    name: yup.string().min(2, 'First name should be miniumum 2 characters!').required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string().min(2, 'Password should have miniumum 2 characters!').required('Required')
});

const Register = (props) => {
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuth);

    const handleRegister = async (data) => {
        const { name, email, password } = data;
        console.log(name, email, password);
        try {
            let res = await axios({
                method: 'post',
                url: 'http://localhost:5000/user/register',
                data: {
                    name,
                    email,
                    password
                }
            });
            dispatch(loginUserSuccess(res.data));
        } catch (err) {
            console.log('err', err);
        }
    };

    if (isAuth) {
        return <Redirect to="/" />;
    } else {
        return (
            <div className={classes.layout}>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (data, { setSubmitting }) => {
                        setSubmitting(true);
                        //async call
                        await handleRegister(data);
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className={classes.authPage}>
                            <Box className={classes.header}>Sign up as new user</Box>{' '}
                            <div>
                                <MyTextField placeholder="First Name" name="name" label="First Name" required={true} />
                            </div>
                            <div>
                                <MyTextField
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    label="Email"
                                    required={true}
                                />
                            </div>
                            <div>
                                <MyTextField
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    label="Password"
                                    required={true}
                                />
                            </div>
                            <div>
                                <Button
                                    disabled={isSubmitting}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    fullWidth
                                >
                                    Sign Up
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
                Already existing User?
                <Link to="/">Login</Link>
            </div>
        );
    }
};

export default Register;
