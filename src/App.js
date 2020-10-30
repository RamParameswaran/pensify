import React from 'react'
import * as Realm from 'realm-web'
import { BrowserRouter } from 'react-router-dom'

// APIs & utils
import config from 'config'

import useAuth from 'components/auth/useAuth'

// Screens
import Login from 'screens/login/Login'
import Home from 'screens/home/Home'

// Context

// Components
import Header from 'components/header/Header'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

// Styles
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({}))

const app = new Realm.App({ id: config.REALM_APP_ID })

function App() {
    const classes = useStyles()

    const { user } = useAuth()

    return (
        <BrowserRouter>
            <Header />

            {user ? (
                // If user is authenticated - return Home screen
                <DndProvider backend={HTML5Backend}>
                    <Home />
                </DndProvider>
            ) : (
                // If user is NOT authenticated - return Login screen
                <Login />
            )}
        </BrowserRouter>
    )
}

export default App
