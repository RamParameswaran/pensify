// Created: 09 July 2020

import React, { useState } from 'react'

// APIs & utils

// Screens

// Components
import Grid from 'components/grid/Grid'
import Heading from './Heading'
import initialData from 'initialData'

// Styles
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {},
    card: {
        display: 'inline-flex',
        padding: 10,
        margin: 10,
        minWidth: 300,
        minHeight: 300,
    },
}))

export default function Home(props) {
    const classes = useStyles()

    const [headings, setHeadings] = useState(initialData.headings)
    const [notes, setNotes] = useState(initialData.notes)

    /* function: `onDropCallback`
        Called when a 'note' is dropped into a 'heading' object. Updates the field note.heading

        :inputs:
            - item: {type: '', id: int } --> the item being dragged
            - monitor: obj --> the react-dnd monitor object
            - heading: obj --> the `heading` which the item is being dropped into
    
        :return:
            - null
    */
    const onDropNoteCallback = (item, monitor, heading) => {
        var note_updated = notes.find((note) => note.id === item.id)
        note_updated.heading = heading.id
        setNotes((prevState) => {
            const newNotes = prevState
                .filter((note) => note.id !== item.id)
                .concat({ ...note_updated })
            return [...newNotes]
        })
    }

    /* function: `reorderNotes`
        Called when a note is hovered over another note. Updates the note.order property
        by making draggedNote.order = hoveredNote.order + 1

        :return:
            - null
     */
    const reorderNotes = (drag_NoteIndex, hover_NoteIndex) => {
        const draggedNote = notes.find((note) => note.id === drag_NoteIndex)
        const hoveredNote = notes.find((note) => note.id === hover_NoteIndex)

        const hoveredNote_order = hoveredNote.order
        var new_notes = notes

        new_notes
            .filter((note) => note.order >= hoveredNote_order)
            .map((note) => (note.order = note.order + 1))
        new_notes.find(
            (note) => note.id === draggedNote.id
        ).order = hoveredNote_order
        setNotes(new_notes)
    }

    return (
        <Grid>
            {headings.map((heading) => {
                var note_array = notes
                    .filter((note) => note.heading === heading.id)
                    .sort((a, b) => a.order - b.order)
                return (
                    <Heading
                        heading={heading}
                        notes={note_array}
                        onDropNoteCallback={onDropNoteCallback}
                        reorderNotes={reorderNotes}
                    />
                )
            })}
        </Grid>
    )
}
