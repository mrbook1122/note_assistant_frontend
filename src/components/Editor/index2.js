import React, {useState, useEffect, useRef} from 'react'
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js'
import styled from "styled-components";

import ControlBar from "./ControlBar";
import './index.css'

const Container = styled.div`
    flex-grow: 1;
    margin: 0 10px 5px;
`

const EditorComponent = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const editor = useRef(null)

    const _toggleBlockType = blockType => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType))
    }

    const _toggleInlineStyle = inlineStyle => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))
    }

    useEffect(() => {
        console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())))
    })

    const myBlockStyleFn = contentBlock => {
        const type = contentBlock.getType()
        if (type === 'header')
            return 'mrbook-header'
    }

    const focus = () => {editor.current.focus()}

    const _handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            setEditorState(newState)
            return true
        }
        return false
    }

    return (
        <Container onClick={focus}>
            <ControlBar
                onToggleInlineStyle={_toggleInlineStyle}
                onToggleBlockType={_toggleBlockType}
                editorState={editorState}/>
            <Editor editorState={editorState}
                    handleKeyCommand={_handleKeyCommand}
                    blockStyleFn={myBlockStyleFn}
                    ref={editor}
                    onChange={setEditorState}/>
        </Container>
    )
}

export default EditorComponent