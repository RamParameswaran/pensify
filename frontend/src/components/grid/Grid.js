// Created: 09 July 2020

import React, { useRef, useEffect } from 'react'

// APIs & utils

// Screens

// Components

// Styles
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    gridWrapper: {
        display: 'grid',
        'grid-gap': 15,
        'grid-template-columns': 'repeat(auto-fill, minmax(240px, 1fr))',
        'grid-auto-rows': 180,
    },
}))

export default function Grid(props) {
    const classes = useStyles()

    const gridRef = useRef(null)

    const { children } = props

    useEffect(() => {
        const grid = gridRef.current
        adjustGridItemsHeight(grid)
    })

    return (
        <div className={classes.gridWrapper} ref={gridRef}>
            {children}
        </div>
    )
}

// This function adjust each item in the grid accordlying
// with their height.
// Each item has to have an inner container, used to calculate
// its overflow. Check GridItem component for an example.
const adjustGridItemsHeight = (grid) => {
    const items = grid.children

    for (let i = 0; i < items.length; i++) {
        let item = items[i]
        let rowHeight = parseInt(
            window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')
        )
        let rowGap = parseInt(
            window.getComputedStyle(grid).getPropertyValue('grid-row-gap')
        )
        let rowSpan = Math.ceil(
            (item.firstChild.getBoundingClientRect().height + rowGap) /
                (rowHeight + rowGap)
        )
        item.style.gridRowEnd = 'span ' + rowSpan
    }
}
