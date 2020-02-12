import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import {connect} from 'react-redux'

import Note from "./Note";
import Skeleton from "../Skeleton";
import {fetchNotes} from "../../../actions";
import {NoteContextMenu} from "../ContextMenu";
import NoteListUI from "./NoteListUI";

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
    // 如果笔记本的笔记列表没有初始化，则获取列表
    // useEffect(() => {
    //     if (props.notebook && props.notebook.status === 0) {
    //         props.dispatch(fetchNotes())
    //     }
    // }, [props.notebook])

    const noteMenu = useRef(null)
    // 全局点击之后隐藏右键菜单
    useEffect(() => {
        let listener = () => {
            noteMenu.current.style.visibility = 'hidden'
        }
        document.addEventListener('click', listener)
        return () => {
            document.removeEventListener('click', listener)
        }
    }, [])

    let content = null
    if (props.notebook !== undefined) {
        // 笔记列表未初始化，展示骨架屏
        if (props.notebook.status === 0) {
            content = <Skeleton/>
        } else {
            content = <NoteListUI notebook={props.notebook}/>
        }
    }

    return (
        <div style={{position: 'relative'}}>
            <NoteContextMenu ref={noteMenu}/>
            <Container>
                {content}
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    notebook: state.notebooks.find(notebook => notebook.select)
})

export default connect(mapStateToProps)(NoteList)