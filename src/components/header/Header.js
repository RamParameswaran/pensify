// Created: 15 May 2020
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import logo_placeholder from 'assets/logos/logo_placeholder.png'

import { AppBar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.header,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9,
    },
    logo: { height: 40, verticalAlign: 'middle' },
    iconPrimary: { color: theme.palette.common.white },
    headerSpacer: {
        width: '100%',
        height: 65,
        [theme.breakpoints.down('xs')]: {
            height: 55,
        },
    },
}))

function Header(props) {
    const classes = useStyles()

    return (
        <Fragment>
            <AppBar position="static" className={classes.root}>
                <Toolbar className={classes.toolbar}>
                    {/* LOGO */}
                    <Link to="/" className={classes.logoContainer}>
                        <img
                            src={logo_placeholder}
                            alt="logo"
                            className={classes.logo}
                        />
                    </Link>

                    {props.children}
                </Toolbar>
            </AppBar>

            <div className={classes.headerSpacer}></div>
        </Fragment>
    )
}

export default Header
