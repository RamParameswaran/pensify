// Modified: 30 October 2020
// This is a top-level context component. It performs several purposes:
// 		i) it carries all state for the `user` object
//		ii) it is the Context Provider for all child components which want to access/manipulate the `user` state

import React, { useState, useEffect } from 'react'
import * as Realm from 'realm-web'

// APIs & utils
import config from 'config'

// Components
import { useAlert } from 'react-alert'
import FullscreenSpinner from 'components/spinners/FullscreenSpinner'

// Styles

const AuthContext = React.createContext([{}, () => {}])

const app = Realm.App.getApp(config.REALM_APP_ID)

const AuthProvider = (props) => {
    const [loading, setLoading] = useState(false)

    // 2) Create the `player` object and define initial State values
    var [state, setState] = useState(app.currentUser)
    const alert = useAlert()

    return (
        <AuthContext.Provider value={[state, setState]}>
            {loading ? <FullscreenSpinner /> : props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
