import React from 'react'

import { CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}))

export default function FullscreenSpinner() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <CircularProgress color="secondary" size="1.5rem" />
        </div>
    )
}
