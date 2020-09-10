// Created: 09 September 2020

import React, { Fragment, useRef } from 'react'
// import { Link, withRouter } from "react-router-dom";

// APIs & utils
import { useDrag } from 'react-dnd'
import ItemTypes from 'components/dnd/ItemTypes'

// Screens

// Components

// Styles
import { makeStyles } from '@material-ui/core/styles'
import { Card, Typography } from '@material-ui/core'

const Note = (props) => {
    const { note } = props

    const ref = useRef(null)

    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.NOTE, id: note.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    drag(ref)

    return (
        <Fragment>
            <div ref={ref} style={{ opacity: isDragging ? 0.1 : 1 }}>
                <p>{note.content}</p>
            </div>
        </Fragment>
    )
}

export default Note
