import React, { Fragment, useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// APIs & utils
import config from 'config'
import { AuthProvider } from 'components/auth/AuthContext'

// Screens
import Login from 'screens/login/Login'
// import Home from 'screens/home/Home'

// Context

// Components
import ReactGA from 'react-ga'

// Styles
import { makeStyles } from '@material-ui/core/styles'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'components/alerts/AlertTemplate'

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
    },
    scrollable: {
        minHeight: 'calc(100vh - 300px)',
        position: 'relative',
    },
}))

// React Alerts render options
const alert_options = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    transition: transitions.FADE,
}

// Initialize google analytics page view tracking
// ReactGA.initialize(config.GA_TRACKING_ID, {
//     // debug: true,
//     gaOptions: {
//         sampleRate: 100,
//         siteSpeedSampleRate: 30,
//         cookieDomain: 'none',
//     },
// })

function App() {
    const classes = useStyles()

    return (
        <AlertProvider template={AlertTemplate} {...alert_options}>
            <AuthProvider>
                <div className={classes.root}>
                    <Login />
                    {/* <BrowserRouter>
                    <Header />

                    <div id="scrollable-content" className={classes.scrollable}>
                        <Switch>
                            <Route path="/" exact component={Home} />
                        </Switch>
                    </div>

                    <Footer />
                </BrowserRouter> */}
                </div>
            </AuthProvider>
        </AlertProvider>
    )
}

export default App
