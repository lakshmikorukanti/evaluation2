import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getEmployeeData } from '../redux/auth/actions';
import { logoutUser } from '../redux/auth/actions';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '10px'
    },
    paper: {
        padding: '20px 20px 20px 20px',
        width: '90%',
        paddingBottom: '60px',
        borderRadius: '15px',
        background: '#fafdff',
        alignItems: 'center',
        boxShadow: '20px 20px 64px #dadcde ,-20px -20px 64px #ffffff'
    },
    control: {
        padding: theme.spacing(2)
    },
    button: {
        width: '60%',
        height: '40px',
        marginLeft: '-100px',
        marginTop: '10px'
    },
    mainGrid: {
        marginTop: '40px',
        marginBottom: '40px'
    },
    formControl: {
        width: '100%'
    },
    link: {
        textDecoration: 'none'
    }
}));
export default function Pagination(props) {
    const { employeeData, totalPages } = useSelector((state) => state.auth);
    console.log(employeeData, 'data');
    const { isAuth, error } = useSelector((state) => state.auth);
    const [ params, setParams ] = useState({
        name: '',
        date: '',
        gender: '',
        page: props.match.params.page,
        perPage: props.match.params.per_page
    });
    const classes = useStyles();

    console.log(totalPages, isAuth, 'dfgh');
    const dispatch = useDispatch();

    const array = new Array(totalPages).fill(0);
    console.log(totalPages, array);

    useEffect(
        () => {
            dispatch(getEmployeeData(params));
        },
        [ params.name, params.page, params.perPage, params.date, params.gender, isAuth ]
    );
    const handleChange = (e) => {
        setParams({ ...params, [e.target.name]: e.target.value });
    };

    const handleLogout = (e) => {
        dispatch(logoutUser(e));
    };
    let history = useHistory();
    const handlePage = (e, index) => {
        setParams({ ...params, page: index + 1 });
        history.push(`/Home/${index + 1}/${params.perPage}`);
    };
    console.log(params, employeeData, 'pahe');

    return (
        <Grid container className={classes.root} spacing={2} justify="center">
            <Grid item container lg={12}>
                <Grid item container lg={11} />
                <Grid item container lg={1}>
                    <Button variant="contained" color="secondary" onClick={handleLogout}>
                        LOGOUT
                    </Button>
                </Grid>
            </Grid>
            <Grid item container lg={12} className={classes.mainGrid}>
                <Grid item container lg={4}>
                    <Grid item container lg={12}>
                        <Grid item container lg={4}>
                            <h4>Patient Name:</h4>
                        </Grid>
                        <Grid item container lg={8}>
                            <TextField
                                id="outlined-password-input"
                                label="name"
                                name="name"
                                value={params.name}
                                type="text"
                                autoComplete="current-password"
                                variant="outlined"
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item container lg={6}>
                    <Grid item container lg={6}>
                        <Grid container item lg={4} sm={2} xs={2}>
                            <h4>Sort by Joining Date:</h4>
                        </Grid>
                        <Grid container item lg={8} sm={5} xs={10}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Joining Date</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    name="Joining Date"
                                    onChange={handleChange}
                                    label="Joining Date"
                                    value={params.date}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>

                                    <MenuItem value="asc">Ascending Order</MenuItem>
                                    <MenuItem value="desc">Descending Order</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item container lg={1} />
                    <Grid item container lg={5}>
                        <Grid container item lg={2} sm={2} xs={2}>
                            <h4>Gender:</h4>
                        </Grid>
                        <Grid item container lg={1} />
                        <Grid container item lg={8} sm={5} xs={10}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    name="gender"
                                    onChange={handleChange}
                                    label="gender"
                                    value={params.gender}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>

                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {employeeData.length > 0 ? (
                        employeeData.map((value) => (
                            <Grid key={value._id} item lg={4} justify="center">
                                <Paper className={classes.paper}>
                                    <h3>Name:{value.name}</h3>
                                    <h3>Gender:{value.gender}</h3>
                                    <h3>Department:{value.department}</h3>
                                    <h3>Joining date:{value.joining_date}</h3>
                                    <h3>Salary:{value.payment[0].amount}</h3>
                                    <h3>Duration:{value.payment[0].mode}</h3>
                                </Paper>
                            </Grid>
                        ))
                    ) : null}
                </Grid>
                <Grid item container lg={12} justify="center">
                    {array.map((a, index) => (
                        <Button
                            className={classes.mainGrid}
                            key={index}
                            value={index + 1}
                            variant="contained"
                            style={{ marginLeft: '10px' }}
                            color="secondary"
                            onClick={(e) => handlePage(e, index)}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}
