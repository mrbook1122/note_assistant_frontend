import React, {useEffect} from "react";
import styled from "styled-components";
import {connect} from 'react-redux'

import Note from "./Note";
import {fetchNotes} from "../../actions";

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
    useEffect(() => {
        //判断笔记本的笔记列表是否已经初始化
        if (props.notebook && props.notebook.status === 0) {
            props.dispatch(fetchNotes())
        }
    }, [props.notebook])

    //如果未有选中的笔记本，则返回null
    if (props.notebook === undefined)
        return <Container/>
    return (
        <Container>
            {props.notebook.notes.map((note, index) => <Note key={index} note={note}/>)}
        </Container>
    )
}

const mapStateToProps = state => ({
    notebook: state.notebooks.find(notebook => notebook.select)
})

export default connect(mapStateToProps)(NoteList)