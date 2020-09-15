// Created: 09 September 2020

import React, { Fragment, useRef } from 'react'
// import { Link, withRouter } from "react-router-dom";

// APIs & utils
import { useDrag, useDrop } from 'react-dnd'
import ItemTypes from 'components/dnd/ItemTypes'

// Screens

// Components

// Styles
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {},
    note: {
        padding: 5,
        marginBottom: 5,
        borderRadius: 3,
        backgroundColor: theme.palette.common.white,
    },
}))

const Note = (props) => {
    const classes = useStyles()
    const { note, index } = props

    return (
                <div
                    className={classes.note}
            style={{
                opacity: isDragging ? 0.1 : 1,
                borderTop: isOver ? 'solid 1px yellow' : 'solid 0px black',
            }}
                >
                    <Typography variant="body1" gutterBottom>
                        {note.content}
                    </Typography>
                </div>
    )
}

export default Note
