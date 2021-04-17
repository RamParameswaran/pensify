import React, { Fragment } from 'react'

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
import HeaderAuthenticated from 'components/header/HeaderAuthenticated'
import { NoteProvider } from 'components/notes/NoteContext'

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
    const { user } = useAuth()

    return user ? (
        // If user is authenticated - return Home screen
        <ApolloProvider client={client}>
            <NoteProvider>
                <HeaderAuthenticated />
                <Home />
            </NoteProvider>
        </ApolloProvider>
    ) : (
        // If user is NOT authenticated - return Login screen
        <Fragment>
            <Header />
            <Login />
        </Fragment>
    )
}

export default App
