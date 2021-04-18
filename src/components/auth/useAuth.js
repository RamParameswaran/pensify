import { useContext } from 'react'

import * as Realm from 'realm-web'

import config from 'config'

import { AuthContext } from './AuthContext'

// Components

const app = Realm.App.getApp(config.REALM_APP_ID)

export const useAuth = () => {
    const [state, setState] = useContext(AuthContext)

    function loginWithFacebook(accessToken) {
        // Login user with Realm backend
        const credentials = Realm.Credentials.facebook(accessToken)
        app.logIn(credentials).then((user) => {
            setState(user)
        })
    }

    function loginWithGoogle(token) {
        // Login user with Realm backend
        const credentials = Realm.Credentials.google(token)
        app.logIn(credentials).then((user) => {
            setState(user)
        })
    }

    function logout() {
        // Log out the current user
        app.currentUser.logOut().then(() => {
            setState(null)
        })
    }

    return {
        loginWithFacebook,
        loginWithGoogle,
        logout,
        user: state,
    }
}
