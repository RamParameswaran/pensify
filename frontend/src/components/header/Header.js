// Created: 15 May 2020
import React, { Fragment, useState, useEffect } from 'react'
import { withRouter, Link, NavLink } from 'react-router-dom'

// APIs & utils
import AuthApi from 'api/AuthApi'
import useAuth from 'components/auth/useAuth'

// Screens

// Components
import { useAlert } from 'react-alert'
import SearchWidget from './SearchWidget'
import logo_placeholder from 'assets/logos/logo_placeholder.png'

// Styles
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'

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

    const { user, clearUser } = useAuth()

    // user Menu handling
    const [anchorEl, setAnchorEl] = React.useState(null)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleLogout = () => {
        setAnchorEl(null)
        AuthApi.logout().then((res) => {
            clearUser()
        })
    }

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

                    {user._id && (
                        <Fragment>
                            <div style={{ flexGrow: 1 }}>
                                <SearchWidget />
                            </div>
                            <div>
                                <IconButton
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                    className={classes.iconPrimary}
                                >
                                    <MenuIcon className={classes.iconPrimary} />
                                </IconButton>

                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>
                                        Profile
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        My account
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>

            <div className={classes.headerSpacer}></div>
        </Fragment>
    )
}

export default withRouter(Header)
