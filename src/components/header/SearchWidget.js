import React, { Fragment, useEffect, useState } from 'react'

import { useNote } from 'components/notes/NoteContext'

import { Input, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'

const useStyles = makeStyles((theme) => ({
    root: {},
    input: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 5,

        width: '80%',
        marginLeft: '5%',
        paddingLeft: 20,
    },
    input_base: { height: '2rem' },
    button: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 5,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
}))

export default function SearchWidget() {
    const classes = useStyles()

    const [searchTerm, setSearchTerm] = useState('')

    const {
        generateEmptyNote,
        setActiveNote,
        showNoteModal,
        toggleShowNoteModal,
    } = useNote()

    useEffect(() => {
        // When closing the NoteModal, set the searchTerm back to its initial state
        if (!showNoteModal) {
            setSearchTerm('')
        }
    }, [showNoteModal])

    return (
        <Fragment>
            <Input
                disableUnderline={true}
                className={classes.input}
                classes={{ input: classes.input_base }}
                placeholder="Search ... or start a new note"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value)
                }}
            />
            <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                color="secondary"
                onClick={() => {
                    toggleShowNoteModal()
                    setActiveNote({
                        ...generateEmptyNote(),
                        content: searchTerm,
                    })
                }}
                className={classes.button}
            >
                <PlaylistAddIcon style={{ color: '#fff' }} />
            </IconButton>
        </Fragment>
    )
}
