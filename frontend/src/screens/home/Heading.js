// Created: 09 September 2020

import React, { Fragment, useRef } from 'react'
// import { Link, withRouter } from "react-router-dom";

// APIs & utils
import { useDrop } from 'react-dnd'
import ItemTypes from 'components/dnd/ItemTypes'

// Screens

// Components
import Note from './Note'

// Styles
import { makeStyles } from '@material-ui/core/styles'
import { Card, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {},
    isOver: { backgroundColor: 'red' },
}))

export default function Heading(props) {
    const classes = useStyles()
    const ref = useRef(null)

    const { heading, notes, onDropCallback } = props

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.NOTE,
        drop: (item, monitor) => onDropCallback(item, monitor, heading),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    })

    drop(ref)

    return (
        <Card
            ref={ref}
            raised
            key={heading.id}
            className={isOver && classes.isOver}
        >
            <Typography variant="h5" gutterBottom>
                {heading.title}
            </Typography>
            {notes.map((note, idx) => (
                <Note key={note.id} note={note} index={idx} />
            ))}
        </Card>
    )
}
