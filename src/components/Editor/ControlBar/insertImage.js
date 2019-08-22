import React from 'react'
import styled from "styled-components";
import Draft from 'draft-js'

import IMAGE from '../../../icons/editor-image.svg'

const {
    AtomicBlockUtils,
    Editor,
    EditorState,
    RichUtils,
    convertToRaw,
} = Draft;

const ButtonContainer = styled.div`
    margin: 0 5px;
    :hover {
        background: #ccc;
    }
    background: ${props => props.select ? '#ccc' : null};
`

const Img = styled.img`
    width: 20px;
    height: 20px;
`

const ImageButton = props => {
    const {editorState} = props

    return (
        <ButtonContainer>
            <Img src={IMAGE}/>
        </ButtonContainer>
    )
}

export default ImageButton