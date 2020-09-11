// Created: 09 September 2020

import React, { Fragment, useRef } from 'react'
// import { Link, withRouter } from "react-router-dom";

// APIs & utils
import { useDrag, useDrop } from 'react-dnd'
import ItemTypes from 'components/dnd/ItemTypes'

// Screens

// Components

// Styles
// import { makeStyles } from '@material-ui/core/styles'
// import { Card, Typography } from '@material-ui/core'

const Note = (props) => {
    const { note, onReorder } = props

    const ref = useRef(null)

    // `useDrag` hook defines drag behaviour of Note
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.NOTE, id: note.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    // `useDrop` hook defines drop behaviour of Note (used
    // for sorting within a Heading)
    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.NOTE,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
        hover(dragged, monitor) {
            if (!ref.current) {
                return
            }

            const drag_index = dragged.id
            const hover_index = note.id

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

            onReorder(drag_index, hover_index, ItemTypes.NOTE)
        },
    })

    drop(drag(ref))

    return (
        <Fragment>
            <div
                ref={ref}
                style={{
                    opacity: isDragging ? 0.1 : 1,
                    borderTop: isOver ? 'solid 1px yellow' : 'solid 0px black',
                }}
            >
                <p>{note.content}</p>
            </div>
        </Fragment>
    )
}

export default Note
