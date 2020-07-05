// Created: 22 June 2020

import React from 'react'
import { Link, Redirect } from 'react-router-dom'

// APIs & utils
// import useAuth from "components/auth/useAuth";

// Screens

// Components
import GoogleAuthBtn from 'components/auth/google/GoogleAuthBtn'
import FacebookAuthBtn from 'components/auth/facebook/FacebookAuthBtn'

// Styles
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 600,
        minWidth: 300,
    },
    title: {
        textAlign: 'center',
    },

    divider: {
        color: theme.palette.text.disabled,
        textAlign: 'center',

        marginTop: '2rem',
        marginBottom: '2rem',
    },
}))

export default function Login(props) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2} style={{ display: 'block' }}>
                    <Typography
                        variant="h6"
                        color="primary"
                        className={classes.title}
                    >
                        Log in and start taking note!
                    </Typography>
                    <Grid
                        container
                        style={{ textAlign: 'center', marginTop: 20 }}
                    >
                        <Grid item xs={12} style={{ marginBottom: 10 }}>
                            <GoogleAuthBtn buttonText="Login with Google" />
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: 10 }}>
                            <FacebookAuthBtn buttonText="Login with Facebook" />
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}
