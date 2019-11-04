/*global chrome*/
import React, {useState, useEffect} from 'react'
import styled from "styled-components";
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import axios from 'axios'

const Container = styled.div`
    height: calc(100% - 100px);
    margin: 0 10px;
`

const base_url = process.env.REACT_APP_BASE_URL
let token = localStorage.getItem('Token')
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

const Editor = () => {
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
        // if (editorState === null) {
        //     axios.get(base_url + '/user/note', {
        //         params: {
        //             url: note_url
        //         },
        //         headers: {
        //             Token: token
        //         }
        //     }).then(resp => {
        //         if (resp.data.note)
        //             setEditorState(BraftEditor.createEditorState(resp.data.note))
        //     })
        // }
    })

    return (
        <Container>
            <BraftEditor value={editorState}
                         style={{height: '100%'}}
                         onChange={contentChange}/>
        </Container>
    )
}

export default Editor