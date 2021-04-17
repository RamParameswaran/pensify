import React, { Fragment } from 'react'

import Grid from 'components/grid/Grid'
import { useNote } from 'components/notes/NoteContext'
import NoteModal from 'components/notes/NoteModal'

import { Modal } from '@material-ui/core'

export default function Home() {
    const { showNoteModal, toggleShowNoteModal } = useNote()

    return (
        <Fragment>
            <Grid />

            <Modal
                open={showNoteModal}
                onClose={toggleShowNoteModal}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <NoteModal />
            </Modal>
        </Fragment>
    )
}
