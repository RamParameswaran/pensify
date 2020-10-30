// Created: 26 June 2020

import React from 'react'

// APIs & utils
import useAuth from 'components/auth/useAuth'

// Screens

// Components
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { AiFillFacebook } from 'react-icons/ai'
import { useAlert } from 'react-alert'

// Styles
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    button: {
        minHeight: 45,
        width: 'calc(100% - 20px)',
        padding: 10,

        fontFamily: 'Helvetica,sans-serif',
        fontWeight: 700,
        lineHeight: 'normal',
        fontSize: 14,
        color: '#fff',
        textDecoration: 'none',

        cursor: 'pointer',
        display: 'inline-flex',

        transition: 'background-color .3s,border-color .3s',
        backgroundColor: '#4c69ba',
        '&:hover': { backgroundColor: '#4c69ba' },
        border: 'calc(.06887vw + .67769px) solid #4c69ba',
        boxShadow:
            'rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px',
    },
    icon: {
        display: 'inline-block',
        paddingRight: 10,
        transform: 'scale(1.5)',
    },
}))

const FacebookButton = (props) => {
    const classes = useStyles()

    return (
        <Button
            onClick={props.onClick}
            disabled={props.disabled}
            className={classes.button}
            variant="contained"
        >
            <div style={{ display: 'inline-block' }}>
                <AiFillFacebook className={classes.icon} />
            </div>
            {props.buttonText}
        </Button>
    )
}

export default function FacebookAuthBtn(props) {
    const classes = useStyles()
    const alert = useAlert()

    const { loginWithFacebook } = useAuth()

    const responseFacebook = (response) => {
        if (response.accessToken) {
            loginWithFacebook(response.accessToken)
        } else {
            handleLoginFailure(response)
        }
    }

    const handleLoginFailure = (response) => {
        console.log(response)
        alert.error('Failed to log in')
    }

    return (
        <FacebookLogin
            appId="282429899774334"
            fields="name,email,picture"
            callback={responseFacebook}
            render={(renderProps) => (
                <FacebookButton
                    onClick={renderProps.onClick}
                    buttonText={props.buttonText}
                />
            )}
        />
    )
}
