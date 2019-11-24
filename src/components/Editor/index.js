/*global chrome*/
import React, {useState, useEffect} from 'react'
import styled from "styled-components";
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import {connect} from 'react-redux'
import axios from 'axios'
import {updateNoteTitle} from "../../actions/note";

const Container = styled.div`
    height: calc(100% - 100px);
    margin: 0 10px;
`

let note_url = ''

if (chrome.runtime.onMessage) {
    console.log('message')
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            console.log('aaaa')
            console.log(sender.tab.url)
            note_url = sender.tab.url
            sendResponse({})
        }
    )
}

const Editor = props => {
    const [editorState, setEditorState] = useState(null)

    const [timeoutId, setTimeoutId] = useState(0)
    const contentChange = editorState => {
        clearTimeout(timeoutId)
        let id = setTimeout(() => {
            if (props.note.status === 1) {
                axios.post('/note/update/content', {
                    content: editorState.toRAW(),
                    id: props.note.noteId
                }, {
                    headers: {
                        Token: localStorage.getItem('token')
                    }
                })
            }
        }, 3000)
        setTimeoutId(id)
        setEditorState(editorState)
    }

    useEffect(() => {
        if (props.note && props.note.status === 1) {
            axios.get('/note/info', {
                headers: {
                    Token: localStorage.getItem('token')
                },
                params: {
                    id: props.note.noteId
                }
            }).then(resp => {
                if (resp.data.code === 200) {
                    setEditorState(BraftEditor.createEditorState(resp.data.note.content))
                }
            })
        }
    }, [props.note])

    //未选中笔记本
    if (props.note && props.note.noteId === -1)
        return null

    return (
        <Container>
            <BraftEditor value={editorState}
                         style={{height: '100%'}}
                         onChange={contentChange}/>
        </Container>
    )
}

const mapStateToProps = state => {
    let notebook = state.notebooks.find(notebook => notebook.select)
    if (notebook === undefined)
    //返回id:-1表示未选择笔记本
        return {note: {noteId: -1}}
    let note = notebook.notes.find(note => note.select)
    return {note}
}

export default connect(mapStateToProps)(Editor)