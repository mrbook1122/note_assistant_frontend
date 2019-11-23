/*global chrome*/
import React, {useState, useEffect} from 'react'
import styled from "styled-components";
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import {connect} from 'react-redux'
import axios from 'axios'

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

    const contentChange = editorState => {
        // axios.post(base_url + '/user/note', {
        //     url: note_url,
        //     note: editorState.toRAW()
        // }, {
        //     headers: {
        //         Token: token
        //     }
        // }).then(resp => {
        //     console.log(resp.data)
        // })
        setEditorState(editorState)
    }

    useEffect(() => {
        axios.get('/note/info', {
            headers: {
                Token: localStorage.getItem('token')
            },
            params: {
                id: 1
            }
        }).then(resp => {
            setEditorState(BraftEditor.createEditorState(resp.data.content))
        })
    }, [props.currentNote])

    return (
        <Container>
            <BraftEditor value={editorState}
                         style={{height: '100%'}}
                         onChange={contentChange}/>
        </Container>
    )
}

const mapStateToProps = state => ({
    currentNote: state.currentNote
})

export default connect(mapStateToProps)(Editor)