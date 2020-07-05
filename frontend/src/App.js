import React, { Fragment, useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// APIs & utils
import useAuth from 'components/auth/useAuth'

// Screens
import Login from 'screens/login/Login'
import Home from 'screens/home/Home'

// Context

// Components
import Header from 'components/header/Header'

// Styles
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({}))

function App() {
    const classes = useStyles()

    const { user } = useAuth()

    // If not logged in:
    if (!user._id) {
        return (
            <BrowserRouter>
                <Header />
                <Login />
            </BrowserRouter>
        )
    }

    // If user logged in
    return (
        <BrowserRouter>
            <Header />
            <Home />
        </BrowserRouter>
    )
}

export default App
