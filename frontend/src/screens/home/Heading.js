// Created: 09 September 2020

import React, { Fragment, useRef } from 'react'
// import { Link, withRouter } from "react-router-dom";

// APIs & utils
import { Droppable } from 'react-beautiful-dnd'

// Screens

// Components
import Note from './Note'

// Styles
import { makeStyles } from '@material-ui/core/styles'
import { Card, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {},
    card: { padding: 10, transition: 'background-color 0.2s ease' },
    isDraggingOver: { backgroundColor: 'rgba(0,0,0,0.1)' },
}))

export default function Heading(props) {
    const classes = useStyles()
    const ref = useRef(null)

    const { heading, notes } = props

    return (
        <Droppable droppableId={`${heading.id}`}>
            {(provided, snapshot) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    raised
                    key={heading.id}
                    className={`${classes.card} ${
                        snapshot.isDraggingOver && classes.isDraggingOver
                    }`}
                >
                    <div style={{ height: '100%' }}>
                        <Typography variant="h6">{heading.title}</Typography>
                        {notes.map((note, index) => (
                            <Note key={note.id} note={note} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                </Card>
            )}
        </Droppable>
    )
}
