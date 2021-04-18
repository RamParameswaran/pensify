import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from 'App'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import * as serviceWorker from 'serviceWorker'

import AlertTemplate from 'components/alerts/AlertTemplate'
import { AuthProvider } from 'components/auth/AuthContext'

import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import 'index.css'

const theme = createMuiTheme({
    palette: {
        background: {
            header: '#401f3e',
            footer: '#3BD4AE',
            paper: '#e5ddd8',
            default: '#fff',
        },
        primary: {
            light: '#e3f2fd', // Light blue
            main: '#78798c', // Blue
        },
        secondary: {
            main: '#e14d4d', // Red
        },
        text: {
            primary: '#000', // Black
            secondary: '#fff', // White
            disabled: 'rgb(128,128,128)', // Grey
            error: '#e14d4d', // Red
        },
        common: {
            white: '#FFF',
            black: '#000',
        },
    },
})

// Initialize google analytics page view tracking
// ReactGA.initialize(config.GA_TRACKING_ID, {
//     // debug: true,
//     gaOptions: {
//         sampleRate: 100,
//         siteSpeedSampleRate: 30,
//         cookieDomain: 'none',
//     },
// })

// React Alerts render options
const alert_options = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    transition: transitions.FADE,
}

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <React.StrictMode>
            <AlertProvider template={AlertTemplate} {...alert_options}>
                <AuthProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </AuthProvider>
            </AlertProvider>
        </React.StrictMode>
    </ThemeProvider>,

    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
