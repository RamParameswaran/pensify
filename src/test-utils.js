import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { render } from '@testing-library/react'
import { Provider as AlertProvider } from 'react-alert'

import AlertTemplate from 'components/alerts/AlertTemplate'

import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

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

const AllTheProviders = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <AlertProvider template={AlertTemplate}>
                <BrowserRouter>{children}</BrowserRouter>
            </AlertProvider>
        </ThemeProvider>
    )
}

const customRender = (ui, options) =>
    render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
