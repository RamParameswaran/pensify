// Created: 18 June 2020
// This is a top-level context component. It performs several purposes:
// 		i) it carries all state for the `user` object
//		ii) it is the Context Provider for all child components which want to access/manipulate the `user` state

import React, { useState, useEffect } from 'react'

// APIs & utils
import config from 'config'
import AuthApi from 'api/AuthApi'

// Components
import { useAlert } from 'react-alert'
import FullscreenSpinner from 'components/spinners/FullscreenSpinner'

// Styles

const AuthContext = React.createContext([{}, () => {}])

const AuthProvider = (props) => {
    const [loading, setLoading] = useState(true)

    // 2) Create the `player` object and define initial State values
    var [state, setState] = useState({
        _id: null,
        email: null,
        name: null,
        firstName: null,
        lastName: null,
        profilePicUrl: null,
    })
    const alert = useAlert()

    useEffect(() => {
        // Show FullscreenSpinner while user object is verified (`getUser` method)
        setLoading(true)

        AuthApi.getUser()
            .then((res) => {
                setState({ ...state, ...res })
            })
            .catch((err) => {})

        setLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={[state, setState]}>
            {loading ? <FullscreenSpinner /> : props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
