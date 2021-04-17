// Created: 09 September 2020

import React, { Fragment, useRef } from 'react'
// import { Link, withRouter } from "react-router-dom";

// APIs & utils
import { Draggable } from 'react-beautiful-dnd'

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
        transition: 'background-color 0.2s ease',
    },
    isDragging: {
        backgroundColor: theme.palette.background.paper,
    },
}))

const Note = (props) => {
    const classes = useStyles()
    const { note, index } = props

    return (
        <Draggable draggableId={`${note._id}`} index={index}>
            {(provided, snapshot) => (
                <div
                    className={classes.note}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${classes.note} ${
                        snapshot.isDragging && classes.isDragging
                    }`}
                >
                    <Typography variant="body1" gutterBottom>
                        {note.content}
                    </Typography>
                </div>
            )}
        </Draggable>
    )
}

export default Note
