import React, { useEffect, useState } from 'react'

import clsx from 'clsx'
import {
    ContentState,
    convertFromRaw,
    // convertToRaw,
    Editor,
    EditorState,
} from 'draft-js'
import 'draft-js/dist/Draft.css'

import { useNote } from 'components/notes/NoteContext'

import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Collapse,
    IconButton,
    Typography,
} from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ShareIcon from '@material-ui/icons/Share'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '50%',
        backgroundColor: theme.palette.background.default,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    subheader: {
        color: theme.palette.text.disabled,
    },
}))

const SubHeader = ({ note }) => (
    <div>
        Last modified: {note.modified} <br />
        Tags: {note.tags && note.tags.join(', ')}
    </div>
)

export default function NoteModal() {
    const classes = useStyles()

    const { activeNote } = useNote()

    const [expanded, setExpanded] = useState(false)

    const [titleState, setTitleState] = useState(() => {
        if (activeNote && activeNote.title) {
            // If the note title already exists
            return EditorState.createWithContent(
                ContentState.createFromText(activeNote.title)
            )
        } else {
            // Else create a new draftjs EditorState object
            return EditorState.createEmpty()
        }
    })

    const [contentState, setContentState] = useState(() => {
        if (activeNote && activeNote.content) {
            // If the note content already exists

            if (typeof activeNote.content === 'string') {
                // i) as a plaintext string
                return EditorState.createWithContent(
                    ContentState.createFromText(activeNote.content)
                )
            } else {
                // ii) as a draftjs json blob
                return convertFromRaw(activeNote.content)
            }
        } else {
            // Else create a new draftjs EditorState object

            return EditorState.createEmpty()
        }
    })

    useEffect(() => {
        // Updates the `note.content` property (json object)
        // console.log(convertToRaw(contentState.getCurrentContent()))
    }, [contentState])

    useEffect(() => {
        // Updates the `note.title` property (string)
        // console.log(titleState.getCurrentContent().getPlainText())
    }, [titleState])

    const editor = React.useRef(null)
    function focusEditor() {
        editor.current.focus()
    }

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                disableTypography
                title={
                    <Editor
                        ref={editor}
                        editorState={titleState}
                        onChange={setTitleState}
                        placeholder="Write something!"
                    />
                }
                subheader={<SubHeader note={activeNote} />}
            />

            <CardContent>
                <Typography variant="body2" color="textPrimary" component="p">
                    <div
                        style={{
                            border: '1px solid black',
                            minHeight: '6em',
                            cursor: 'text',
                        }}
                        onClick={focusEditor}
                    >
                        <Editor
                            ref={editor}
                            editorState={contentState}
                            onChange={setContentState}
                            placeholder="Give your note a title!"
                        />
                    </div>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add
                        saffron and set aside for 10 minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large,
                        deep skillet over medium-high heat. Add chicken, shrimp
                        and chorizo, and cook, stirring occasionally until
                        lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo
                        in the pan. Add pimentón, bay leaves, garlic, tomatoes,
                        onion, salt and pepper, and cook, stirring often until
                        thickened and fragrant, about 10 minutes. Add saffron
                        broth and remaining 4 1/2 cups chicken broth; bring to a
                        boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with
                        artichokes and peppers, and cook without stirring, until
                        most of the liquid is absorbed, 15 to 18 minutes. Reduce
                        heat to medium-low, add reserved shrimp and mussels,
                        tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just
                        tender, 5 to 7 minutes more. (Discard any mussels that
                        don’t open.)
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes,
                        and then serve.
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}
