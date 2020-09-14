import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import cookie from 'react-cookies'
import axios from 'axios';
import { useHistory } from "react-router-dom";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                siddharths067@gmail.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function urlencodeFormData(fd) {
    var s = '';

    function encode(s) {
        return encodeURIComponent(s).replace(/%20/g, '+');
    }

    for (var pair of fd.entries()) {
        if (typeof pair[1] == 'string') {
            s += (s ? '&' : '') + encode(pair[0]) + '=' + encode(pair[1]);
        }
    }
    return s;
}

function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target);
    const username = event.target.username.value;
    const password = event.target.password.value;
    console.log(username);
    console.log(password);
    // Login

    axios.post("http://localhost:8080/login", {
        username: username,
        password: password
    }).then(res => {
        console.log(res.data)
        cookie.save("X-API-KEY", res.data[`X-API-KEY`], {
            path: `/`,
            maxAge: 60*60
        })
        window.location.href = "http://localhost:3000/feed/0"
        
    }).catch(err => {
        console.error(err);
        alert(`Invalid Credentials`);
    });
}


function handleRegister(event) {

    event.preventDefault();
    console.log(`Register Called`);
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(username);
    console.log(password);
    axios.post(`http://localhost:8080/signup`, {
        username: username,
        password: password
    }).then(res => {
        if(res.status == 200)
            alert(`User is in the Database`);
    }).catch(err => {
            alert(`Couldn't register user`);
        console.error(err);
    })

}


export default function SignIn() {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form id={"credForm"} className={classes.form} onSubmit={handleSubmit} method={"POST"} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Grid container>
                        <Grid item xs>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                name={"login"}
                                value={"login"}
                            >
                                Sign In
                            </Button>
                        </Grid>
                        <Grid item xs>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                name={"register"}
                                value={"register"}
                                onClick={handleRegister}
                            >
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
}
