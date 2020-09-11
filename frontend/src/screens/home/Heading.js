// Created: 09 September 2020

import React, { Fragment, useRef } from 'react'
// import { Link, withRouter } from "react-router-dom";

// APIs & utils
import { useDrag, useDrop } from 'react-dnd'
import ItemTypes from 'components/dnd/ItemTypes'

// Screens

// Components
import Note from './Note'

// Styles
import { makeStyles } from '@material-ui/core/styles'
import { Card, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {},
    opacityOverlay: { backgroundColor: 'rgba(0,0,0,0.05)' },
}))

export default function Heading(props) {
    const classes = useStyles()
    const ref = useRef(null)

    const { heading, notes, onDropNoteCallback, onReorder } = props

    // `useDrag` hook defines drag behaviour of Headings
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.HEADING, id: heading.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    const [{ isOver }, drop] = useDrop({
        accept: [ItemTypes.NOTE, ItemTypes.HEADING],
        drop: (item, monitor) => {
            switch (item.type) {
                case 'note':
                    onDropNoteCallback(item, monitor, heading)
                    break
                case 'heading':
                    onDropNoteCallback(item, monitor, heading)
                default:
                    break
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
        hover(dragged, monitor) {
            if (!ref.current) {
                return
            }

            const drag_index = dragged.id
            const hover_index = heading.id

            if (drag_index === hover_index) {
                return
            }

            const hoveredRect = ref.current.getBoundingClientRect()
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2
            const mousePosition = monitor.getClientOffset()
            const hoverClientY = mousePosition.y - hoveredRect.top

            if (drag_index < hover_index && hoverClientY < hoverMiddleY) {
                return
            }

            if (drag_index > hover_index && hoverClientY > hoverMiddleY) {
                return
            }

            onReorder(drag_index, hover_index, ItemTypes.HEADING)
        },
    })

    drag(drop(ref))

    return (
        <Card
            ref={ref}
            raised
            key={heading.id}
            style={{
                opacity: isDragging ? 0.1 : 1,
                borderLeft: isOver ? 'solid 1px yellow' : 'solid 0px black',
            }}
        >
            <div
                className={isOver ? classes.opacityOverlay : ''}
                style={{ height: '100%' }}
            >
                <Typography variant="h5" gutterBottom>
                    {heading.title}
                </Typography>
                {notes.map((note, idx) => (
                    <Note key={note.id} note={note} onReorder={onReorder} />
                ))}
            </div>
        </Card>
    )
}
