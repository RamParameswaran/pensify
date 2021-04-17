import React, { Fragment } from 'react'

import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

import Grid from 'components/grid/Grid'
import { useLayout } from 'components/layout/LayoutContext'
import NoteModal from 'components/notes/NoteModal'
import FullscreenSpinner from 'components/spinners/FullscreenSpinner'

import { Modal } from '@material-ui/core'

import Heading from './Heading'

// import { makeStyles } from '@material-ui/core/styles'

// const useStyles = makeStyles((theme) => ({
//     root: {},
//     card: {
//         display: 'inline-flex',
//         padding: 10,
//         margin: 10,
//         minWidth: 300,
//         minHeight: 300,
//     },
// }))

export default function Home() {
    // const classes = useStyles()

    // const [headings, setHeadings] = useState()
    // const [notes, setNotes] = useState()

    const { activeNote, showNoteModal, toggleShowNoteModal } = useLayout()

    const { data, error, loading } = useQuery(gql`
        query {
            notes {
                _id
                title
                content
                created
                modified
                tags
            }
        }
    `)

    if (loading) return <FullscreenSpinner />

    if (error) {
        // console.log(error)
        return null
    }

    var notes = data.notes
    var headings = []

    const all_tags = []
    notes.map((note) => {
        if (note.tags) {
            note.tags.map((tag) => all_tags.push(tag))
        }
    })

    all_tags.map((tag) => {
        headings.push({
            title: tag,
            notes: notes.filter((note) => {
                if (note.tags) {
                    return note.tags.includes(tag)
                } else {
                    return false
                }
            }),
        })
    })

    return (
        <Fragment>
            <Grid>
                {headings.map((heading) => {
                    return (
                        <Heading
                            key={heading.id}
                            heading={heading}
                            notes={heading.notes}
                        />
                    )
                })}
            </Grid>

            <Modal
                open={showNoteModal}
                onClose={toggleShowNoteModal}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <NoteModal note={activeNote} />
            </Modal>
        </Fragment>
    )
}
