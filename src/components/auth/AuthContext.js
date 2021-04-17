// Modified: 30 October 2020
// This is a top-level context component. It performs several purposes:
// 		i) it carries all state for the `user` object
//		ii) it is the Context Provider for all child components which want to access/manipulate the `user` state

import React, { useEffect, useState } from 'react'

import * as Realm from 'realm-web'

import config from 'config'

import FullscreenSpinner from 'components/spinners/FullscreenSpinner'

const AuthContext = React.createContext([{}, () => {}])

const app = Realm.App.getApp(config.REALM_APP_ID)

const AuthProvider = (props) => {
    const [loading, setLoading] = useState(true)

    var [state, setState] = useState(app.currentUser)

    useEffect(() => {
        if (app.currentUser) {
            setLoading(false)
        }
    }, [app.currentUser])

    return (
        <AuthContext.Provider value={[state, setState]}>
            {loading ? <FullscreenSpinner /> : props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
