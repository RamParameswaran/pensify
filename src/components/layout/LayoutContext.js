import React, { useContext, useState } from 'react'

const LayoutContext = React.createContext([{}, () => {}])

const LayoutProvider = (props) => {
    const [state, setState] = useState({
        showNoteModal: false,
        activeNote: null,
    })

    return (
        <LayoutContext.Provider value={[state, setState]}>
            {props.children}
        </LayoutContext.Provider>
    )
}

const useLayout = () => {
    const [state, setState] = useContext(LayoutContext)

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

export { LayoutContext, LayoutProvider, useLayout }
