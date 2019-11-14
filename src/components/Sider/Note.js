import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {connect} from 'react-redux'

import {changeNote} from "../../actions/note";

const Container = styled.button`
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    border: none;
    
    :focus {
        outline: none;
    }
    background: ${props => props.bgColor};
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
    //设置背景颜色
    const [bgColor, setBgColor] = useState('transparent')
    useEffect(() => {
        if (props.currentNote.id === props.note.id)
            setBgColor('#bbb')
        else setBgColor('transparent')
    }, [props.currentNote])
    const mouseEnter = () => {
        if (bgColor !== '#bbb')
            setBgColor('#eee')
    }
    const mouseLeave = () => {
        if (bgColor !== '#bbb')
            setBgColor('transparent')
    }

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
        props.dispatch(changeNote(props.note.title, props.note.id))
    }
    //如果标题不存在或者为空白字符，则设置标题为‘无标题页’
    let title;
    if (props.note.title === undefined || props.note.title.trim() === '')
        title = '无标题页'
    else title = props.note.title
    return (
        <>
            <Container bgColor={bgColor}
                       onMouseEnter={mouseEnter}
                       onMouseLeave={mouseLeave}
                       onContextMenu={contextMenu} onClick={selectNote}>
                <Title>
                    {title}
                </Title>
            </Container>
        </>
    )
}

const mapStateToProps = state => ({
    currentNote: state.currentNote
})

export default connect(mapStateToProps)(Note)