// Created: 15 May 2020
import React, { Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'

import logo_placeholder from 'assets/logos/logo_placeholder.png'

import useAuth from 'components/auth/useAuth'

import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'

import SearchWidget from './SearchWidget'

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

function Header() {
    const classes = useStyles()

    const { logout, user } = useAuth()

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
        logout()
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

                    {user && (
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
