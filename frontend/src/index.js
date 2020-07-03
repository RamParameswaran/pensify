// Created: 15 May 2020
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from 'serviceWorker'

// APIs & utils

// Screens

// Components
import App from 'App'

// Styles
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import 'index.css'

const theme = createMuiTheme({
    palette: {
        background: {
            header: '#3BD4AE',
            footer: '#3BD4AE',
            paper: '#e5ddd8',
            default: '#fff',
        },
        primary: {
            light: '#e3f2fd', // Light blue
            main: '#78798c', // Blue
        },
        secondary: {
            // light: '#e3f2fd', // Light blue
            main: '#e14d4d', // Red
        },
        text: {
            primary: '#fff', // White
            secondary: '#000', // Black
            disabled: 'rgb(128,128,128)', // Grey
            error: '#e14d4d', // Red
        },
        common: {
            white: '#FFF',
            black: '#000',
        },
    },
})

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ThemeProvider>,

    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
