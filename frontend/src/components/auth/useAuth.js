// Created: 18 June 2020

import { useContext } from 'react'

// APIs & utils
import { AuthContext } from './AuthContext'

// Components
import { useAlert } from 'react-alert'

const useAuth = () => {
    const [state, setState] = useContext(AuthContext)
    // const alert = useAlert()

    function clearUser() {
        setState((state) => ({
            _id: null,
            email: null,
            name: null,
            firstName: null,
            lastName: null,
            profilePicUrl: null,
        }))
    }

    function setUser(user) {
        setState((state) => user)
    }

    return {
        clearUser,
        setUser,
        name: `${state.name}`,
    }
}

export default useAuth
