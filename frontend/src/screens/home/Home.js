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
    const onReorder = (drag_index, hover_index, type) => {
        let items
        let setItems
        switch (type) {
            case 'note':
                items = notes
                setItems = setNotes
                break
            case 'heading':
                items = headings
                setItems = setHeadings
                break
            default:
                return
        }

        var new_items = items

        const draggedItem = new_items.find((item) => item.id === drag_index)
        const hoveredItem = new_items.find((item) => item.id === hover_index)

        if (!draggedItem) return
        if (!hoveredItem) return

        const hoveredItem_order = hoveredItem.order

        new_items
            .filter((item) => item.order >= hoveredItem_order)
            .map((item) => (item.order = item.order + 1))
        draggedItem.order = hoveredItem_order
        setItems(new_items)
    }

    return (
        <Grid>
                {headings
                    // .sort((a, b) => a.order - b.order)
                    .map((heading) => {
                        var note_array = notes
                            .filter((note) => note.heading === heading.id)
                            .sort((a, b) => a.order - b.order)
                        return (
                            <Heading
                                key={heading.id}
                                heading={heading}
                                notes={note_array}
                            />
                        )
                    })}
        </Grid>
    )
}
