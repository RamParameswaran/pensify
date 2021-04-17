import React, { useContext, useState, useEffect } from 'react'

import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

import FullscreenSpinner from 'components/spinners/FullscreenSpinner'

const NoteContext = React.createContext([{}, () => {}])

const NoteProvider = (props) => {
    const query = useQuery(gql`
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

    const [state, setState] = useState({
        notesLoading: true,

        notes: [],
        headings: [],
        activeNote: null,

        showNoteModal: false,
    })

    useEffect(() => {
        setState((state) => ({ ...state, notesLoading: query.loading }))
    }, [query.loading])

    useEffect(() => {
        var headings = []
        var notes = query.data && query.data.notes

        // If query.data exists, we create an array of `heading` object, which are
        // just a list of grouped-notes, grouped by `note.tag`.
        if (notes) {
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
        }

        setState((state) => ({
            ...state,
            notes: notes,
            headings: headings,
        }))
    }, [query.data])

    if (state.notesLoading) return <FullscreenSpinner />

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
        notes: state.notes,
        headings: state.headings,
        activeNote: state.activeNote,

        showNoteModal: state.showNoteModal,
        toggleShowNoteModal: toggleShowNoteModal,

        setActiveNote: setActiveNote,
    }
}

export { NoteContext, NoteProvider, useNote }
