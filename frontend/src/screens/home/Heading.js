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

    // Use React.memo so that all notes aren't re-rendered whenever a drag occurs
    // n.b. - we call setNotes in "Note.js" to reorder the notes, so the necessary
    // re-renders will occur at that point. Hence we can ignore the re-renders here.
    const NotesList = React.memo(
        ({ heading, notes }) => {
            return (
                <Fragment>
                    <Typography variant="h6">{heading.title}</Typography>
                    {notes.map((note, index) => (
                        <Note key={note.id} note={note} index={index} />
                    ))}
                </Fragment>
            )
        },
        (prevProps, nextProps) => true // always take previous NotesList memo
    )

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
                        <NotesList notes={notes} heading={heading} />
                        {provided.placeholder}
                    </div>
                </Card>
            )}
        </Droppable>
    )
}
