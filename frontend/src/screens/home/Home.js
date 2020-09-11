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
    const onDropCallback = (item, monitor, heading) => {
        var note_updated = notes.find((note) => note.id === item.id)
        note_updated.heading = heading.id

        setNotes((prevState) => {
            const newNotes = prevState
                .filter((note) => note.id !== item.id)
                .concat({ ...note_updated })
            return [...newNotes]
        })
    }

    return (
        <Grid>
            {headings.map((heading) => {
                var note_array = notes.filter(
                    (note) => note.heading === heading.id
                )
                return (
                    <Heading
                        heading={heading}
                        notes={note_array}
                        onDropCallback={onDropCallback}
                    />
                )
            })}
        </Grid>
    )
}
