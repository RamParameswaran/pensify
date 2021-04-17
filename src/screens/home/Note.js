import React from 'react'

import { useLayout } from 'components/layout/LayoutContext'

import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {},
    note: {
        padding: 5,
        marginBottom: 5,
        borderRadius: 3,
        backgroundColor: theme.palette.common.white,
        transition: 'background-color 0.2s ease',
    },
    isDragging: {
        backgroundColor: theme.palette.background.paper,
    },
}))

const Note = (props) => {
    const classes = useStyles()
    const { note } = props

    const { setActiveNote, toggleShowNoteModal } = useLayout()

    return (
        <div
            className={classes.note}
            onClick={() => {
                toggleShowNoteModal()
                setActiveNote(note)
            }}
        >
            <Typography variant="body1" gutterBottom>
                {note.content}
            </Typography>
        </div>
    )
}

export default Note
