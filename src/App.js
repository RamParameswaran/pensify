import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import {
    ApolloProvider,
    ApolloClient,
    HttpLink,
    InMemoryCache,
} from '@apollo/client'
import * as Realm from 'realm-web'

import config from 'config'

import Home from 'screens/home/Home'
import Login from 'screens/login/Login'

import useAuth from 'components/auth/useAuth'
import Header from 'components/header/Header'
import { LayoutProvider } from 'components/layout/LayoutContext'

// import { makeStyles } from '@material-ui/core/styles'

// const useStyles = makeStyles(() => ({}))

const app = new Realm.App({ id: config.REALM_APP_ID })

// Get a valid Realm user access token to authenticate requests
async function getValidAccessToken() {
    if (!app.currentUser) {
        return null
    }

    // The logged in user's access token might be stale,
    // Refreshing custom data also refreshes the access token
    await app.currentUser.refreshCustomData()

    // Get a valid access token for the current user
    return app.currentUser.accessToken
}

const client = new ApolloClient({
    link: new HttpLink({
        uri: config.GRAPHQL_URL,
        fetch: async (uri, options) => {
            const accessToken = await getValidAccessToken()
            options.headers.Authorization = `Bearer ${accessToken}`
            return fetch(uri, options)
        },
    }),
    cache: new InMemoryCache(),
})

function App() {
    // const classes = useStyles()

    const { user } = useAuth()

    return (
        <BrowserRouter>
            <Header />

            {user ? (
                // If user is authenticated - return Home screen
                <ApolloProvider client={client}>
                    <LayoutProvider>
                        <Home />
                    </LayoutProvider>
                </ApolloProvider>
            ) : (
                // If user is NOT authenticated - return Login screen
                <Login />
            )}
        </BrowserRouter>
    )
}

export default App
