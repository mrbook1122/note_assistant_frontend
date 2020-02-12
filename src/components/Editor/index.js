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

// 笔记对应的url
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

    /**
     * 在编辑笔记内容时，每隔3秒同步一次笔记内容，
     *
     */
    const [timeoutId, setTimeoutId] = useState(0)
    const contentChange = editorState => {
        clearTimeout(timeoutId)
        let id = setTimeout(() => {
            if (props.note.status === 1) {
                axios.post('/api/note/' + props.note.noteId + '/content', {
                    content: editorState.toRAW()
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

    /**
     * 获取笔记详细信息
     */
    useEffect(() => {
        if (props.note && props.note.status === 1) {
            axios.get('/api/note/' + props.note.noteId, {
                headers: {
                    Token: localStorage.getItem('token')
                }
            }).then(resp => {
                setEditorState(BraftEditor.createEditorState(resp.data.content))
            })
        }
    }, [props.note])

    //如果当前未选中笔记本
    if (props.note === undefined)
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
        return {note: undefined}
    let note = notebook.notes.find(note => note.select)
    return {note}
}

export default connect(mapStateToProps)(Editor)