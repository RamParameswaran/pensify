// Created: 09 July 2020

import React, { useState, useEffect } from 'react'

// APIs & utils
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

// Screens

// Components
import Grid from 'components/grid/Grid'
import Heading from './Heading'
import initialData from 'initialData'
import { DragDropContext } from 'react-beautiful-dnd'

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

    // const [headings, setHeadings] = useState()
    // const [notes, setNotes] = useState()

    const { loading, error, data } = useQuery(gql`
        query {
            headings {
                _id
                order
                title
                notes {
                    _id
                    title
                    content
                }
            }

            notes {
                _id
                title
                content
            }
        }
    `)

    if (loading) return null
    if (error) {
        console.log(error)
        return null
    }

    var headings = data.headings
    var notes = data.notes

    /* function: `onDropNote`
        Drops a `note` object (draggable, source) into a 'heading' object (destination). Updates the 
        `note.heading` and reorders all notes in the destination heading. 

        :inputs:
            - note: note object
            - destination_heading: obj {droppableId: str , index: int}
    
        :return:
            - null
    */
    const onDropNote = (draggableId, source, destination) => {
        const note_obj = notes.find((item) => String(item._id) == draggableId)
        const heading_obj = headings.find(
            (item) => String(item.id) == destination.droppableId
        )

        // Create a new array `notes_list` to avoid mutating the state array `notes`
        // Remove the dragged note item from this array
        const notes_list = Array.from(notes).filter(
            (item) => item._id !== note_obj._id
        )

        // Split `notes_list` into two groups:
        // i) `destination_notes`: notes in the destination heading (which we'll have to insert the dragged note)
        // ii) `other_notes`: everything else (for which no action is required)
        const destination_notes = notes_list.filter(
            (item) => item.heading === heading_obj._id
        )
        const other_notes = notes_list.filter(
            (item) => item.heading !== heading_obj._id
        )

        // Splice the new (updated) note into correct position
        destination_notes.splice(destination.index, 0, {
            ...note_obj,
            heading: heading_obj._id,
        })

        // Reassign `note.order` by starting at 0 and iterating through all `destination_notes`
        for (var i = 0; i < destination_notes.length; i++) {
            destination_notes[i].order = i
        }

        // set state to include `new_destination_notes` and all `other_notes` (minus dragged note)
        notes = [...destination_notes, ...other_notes]
    }

    /* function: `onDragEnd`
        A required input for the 'react-beautiful-dnd' DragDropContext

        :input:
            - `result` (obj) 
                {   draggableId: str , 
                    type: str ,
                    reason: str ,
                    source: {droppableId: str , index: int} ,
                    destination: {droppableId: str , index: int},
                }

        :return:
            - null
     */
    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result

        // If no destination ==> no action
        if (!destination) {
            return
        }

        // If object is returned to original position ==> no action
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        // Otherwise, peform move/reorder
        onDropNote(draggableId, source, destination)
    }

    return (
        <Grid>
            <DragDropContext
                // onDragStart // optional
                // onDragUpdate // optional
                onDragEnd={onDragEnd} // required
            >
                {headings
                    .sort((a, b) => a.order - b.order)
                    .map((heading) => {
                        return (
                            <Heading
                                key={heading.id}
                                heading={heading}
                                notes={heading.notes}
                            />
                        )
                    })}
            </DragDropContext>
        </Grid>
    )
}
