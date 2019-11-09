import React from "react";
import styled from "styled-components";
import {connect} from 'react-redux'

import {changeNotebook} from "../../actions";

const Container = styled.button`
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    border: none;
    background: ${props => props.select ? '#bbb' : 'transparent'};
    
    :hover {
        background: #eee;
    }
    
    :focus {
        outline: none;
        background: #bbb;
    }
`

const Title = styled.div`
    margin-left: 5px;
    font-size: 15px;
    line-height: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    text-align: left;
`

function Note(props) {

    const contextMenu = e => {
        e.preventDefault()
        //props.dispatch(changeNotebook(props.notebookName, props.id))
        let menu = document.getElementById('menu')
        if (menu) {
            menu.style.visibility = 'visible'
            menu.style.left = e.clientX + 'px'
            menu.style.top = e.clientY - 50 + 'px'
        }
    }
    //选中笔记本
    const selectNote = () => {
    }

    return (
        <>
            <Container select={props.select} onContextMenu={contextMenu} onClick={selectNote}>
                <Title>
                    {props.noteName}
                </Title>
            </Container>
        </>
    )
}

export default connect()(Note)