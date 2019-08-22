import React from 'react'
import styled from "styled-components";

import Button from "./Button";
import BLOCK_TYPES from "./blockType";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    user-select: none;
`

const ControlBar = props => {
    const {editorState} = props
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
    const currentStyle = editorState.getCurrentInlineStyle()

    return (
        <Container>
            {BLOCK_TYPES.map(item => {
                if (item.style)
                    return <Button src={item.src}
                                   style={item.style}
                                   onToggleInlineStyle={props.onToggleInlineStyle}
                                   select={currentStyle.has(item.style)}
                                   key={item.style}/>
                else {
                    return <Button src={item.src}
                                   type={item.type}
                                   onToggleBlockType={props.onToggleBlockType}
                                   select={item.type === blockType}
                                   key={item.type}/>
                }
            })}
        </Container>
    )
}

export default ControlBar