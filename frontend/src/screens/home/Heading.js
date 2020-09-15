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
    card: { padding: 10 },
    opacityOverlay: { backgroundColor: 'rgba(0,0,0,0.05)' },
}))

export default function Heading(props) {
    const classes = useStyles()
    const ref = useRef(null)

    const { heading, notes } = props

    return (
        <Card ref={ref} raised key={heading.id} className={classes.card}>
        <Card
            ref={ref}
            raised
            key={heading.id}
            style={{
                opacity: isDragging ? 0.1 : 1,
                borderLeft: isOver ? 'solid 1px yellow' : 'solid 0px black',
            }}
            className={classes.card}
        >
            <div
                className={isOver ? classes.opacityOverlay : ''}
                style={{ height: '100%' }}
            >
                        <Typography variant="h6">{heading.title}</Typography>
                        {notes.map((note, index) => (
                            <Note key={note.id} note={note} index={index} />
                        ))}
                    </div>
        </Card>
    )
}
