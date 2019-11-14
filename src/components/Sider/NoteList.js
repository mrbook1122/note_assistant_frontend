import React, {useEffect} from "react";
import styled from "styled-components";
import {connect} from 'react-redux'

import Note from "./Note";

const Container = styled.div`
    width: 170px;
    height: 100%;
    background: #fdfdfd;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    float: right;
    overflow: auto;
    ::-webkit-scrollbar {
       width: 2px;
       background-color: #fdfdfd;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: gray;
    }
`

const NoteList = props => {

    return (
        <Container>
            {props.currentNotebook.notes.map(note => <Note key={note.id} note={note}/>)}
        </Container>
    )
}

const mapStateToProps = state => ({
    currentNotebook: state.currentNotebook
})

export default connect(mapStateToProps)(NoteList)