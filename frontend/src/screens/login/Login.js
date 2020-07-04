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
import { Button, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {},
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
        <Grid container>
            <Typography variant="h2">Login</Typography>
            <Grid container style={{ textAlign: 'center', marginTop: 20 }}>
                <Grid item xs={12} sm={6} style={{ marginBottom: 10 }}>
                    <GoogleAuthBtn buttonText="Login with Google" />
                </Grid>
                <Grid item xs={12} sm={6} style={{ marginBottom: 10 }}>
                    <FacebookAuthBtn buttonText="Login with Facebook" />
                </Grid>
            </Grid>
        </Grid>
    )
}
