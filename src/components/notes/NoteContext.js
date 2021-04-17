import React, { useContext, useState } from 'react'

const NoteContext = React.createContext([{}, () => {}])

const NoteProvider = (props) => {
    const [state, setState] = useState({
        showNoteModal: false,
        activeNote: null,
    })

    return (
        <NoteContext.Provider value={[state, setState]}>
            {props.children}
        </NoteContext.Provider>
    )
}

const useNote = () => {
    const [state, setState] = useContext(NoteContext)

    function setActiveNote(note) {
        setState((state) => ({ ...state, activeNote: note }))
    }

    function toggleShowNoteModal() {
        setState((state) => ({
            ...state,
            showNoteModal: !state.showNoteModal,
            activeNote: null,
        }))
    }

    return {
        activeNote: state.activeNote,
        showNoteModal: state.showNoteModal,

        toggleShowNoteModal: toggleShowNoteModal,
        setActiveNote: setActiveNote,
    }
}

export { NoteContext, NoteProvider, useNote }
