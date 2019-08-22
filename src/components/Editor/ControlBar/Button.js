import React from 'react'
import styled from "styled-components";

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

const Button = props => {

    const toggle = (e) => {
        e.preventDefault()
        if (props.style) {
            props.onToggleInlineStyle(props.style)
        } else {
            props.onToggleBlockType(props.type)
        }
    }

    return (
        <ButtonContainer onMouseDown={toggle} select={props.select}>
            <Img src={props.src}/>
        </ButtonContainer>
    )
}

export default Button