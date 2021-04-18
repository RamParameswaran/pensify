import React, { Fragment } from 'react'

import { Card, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Note from './Note'

const useStyles = makeStyles(() => ({
    root: {},
    card: { padding: 10, transition: 'background-color 0.2s ease' },
}))

export default function Heading(props) {
    const classes = useStyles()

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
                        <Note key={note._id} note={note} index={index} />
                    ))}
                </Fragment>
            )
        },
        () => true // always take previous NotesList memo
    )

    return (
        <Card raised key={heading._id} className={classes.card}>
            <div style={{ height: '100%' }}>
                <NotesList notes={notes} heading={heading} />
            </div>
        </Card>
    )
}
