import React from "react";

import Note from "./Note";

const NoteListUI = props => {

    let content = props.notebook.notes.map((note, index) =>
        <Note key={index} note={note}/>)

    return (
        <>
            {content}
        </>
    )
}

export default NoteListUI