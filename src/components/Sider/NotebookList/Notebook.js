import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {connect} from 'react-redux'

import {changeNotebook} from "../../../actions";
import Input from "./Input";

const Container = styled.button`
    width: 100%;
    padding: 10px;
    display: flex;
    height: 45px;
    align-items: center;
    border: none;
    background: ${props => props.bgColor};
    :focus {
        outline: none;
    }
`

const Title = styled.div`
    margin-left: 5px;
    font-size: 15px;
    line-height: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 150px;
    text-align: left;
`

function Notebook(props) {
    //设置背景颜色，不通过css的hover设置是因为选中笔记本时应该以选中颜色优先
    const [bgColor, setBgColor] = useState('transparent')
    useEffect(() => {
        if (props.select)
            setBgColor('#bbb')
        else setBgColor('transparent')
    }, [props.select])
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
        props.dispatch(changeNotebook(props.id))
        let menu = props.menu.current
        menu.style.visibility = 'visible'
        menu.style.left = e.clientX + 'px'
        menu.style.top = e.clientY - 50 + 'px'
    }
    //选中笔记本
    const selectNotebook = () => {
        props.dispatch(changeNotebook(props.id))
    }

    if (props.select && props.rename) {
        return (
            <Container bgColor={bgColor}>
                <svg className="icon" viewBox="0 0 1024 1024" width="20" height="20">
                    <path
                        d="M851.2 0 288 0C211.2 0 153.6 57.6 153.6 134.4l0 19.2c-64 12.8-108.8 70.4-108.8 140.8 0 44.8 19.2 83.2 51.2 108.8C64 428.8 44.8 467.2 44.8 512S64 595.2 96 620.8c-32 25.6-51.2 64-51.2 108.8 0 70.4 44.8 121.6 108.8 140.8l0 19.2c0 70.4 57.6 134.4 134.4 134.4l563.2 0c70.4 0 134.4-57.6 134.4-134.4L985.6 134.4C979.2 57.6 921.6 0 851.2 0zM153.6 800c-25.6-12.8-44.8-38.4-44.8-70.4 0-32 19.2-57.6 44.8-70.4L153.6 800zM153.6 582.4C128 569.6 108.8 544 108.8 512c0-32 19.2-57.6 44.8-70.4L153.6 582.4zM153.6 358.4C128 352 108.8 320 108.8 294.4c0-32 19.2-57.6 44.8-70.4L153.6 358.4zM812.8 793.6 352 793.6l0-64 460.8 0L812.8 793.6zM812.8 563.2 352 563.2l0-64 460.8 0L812.8 563.2zM812.8 294.4 352 294.4l0-64 460.8 0L812.8 294.4z"
                        fill="#515151"/>
                </svg>
                <Input notebookName={props.notebookName} dispatch={props.dispatch}/>
            </Container>
        )
    }

    return (
        <Container bgColor={bgColor} onContextMenu={contextMenu}
                   onMouseEnter={mouseEnter}
                   onMouseLeave={mouseLeave}
                   onClick={selectNotebook}>
            <svg className="icon" viewBox="0 0 1024 1024" width="20" height="20">
                <path
                    d="M851.2 0 288 0C211.2 0 153.6 57.6 153.6 134.4l0 19.2c-64 12.8-108.8 70.4-108.8 140.8 0 44.8 19.2 83.2 51.2 108.8C64 428.8 44.8 467.2 44.8 512S64 595.2 96 620.8c-32 25.6-51.2 64-51.2 108.8 0 70.4 44.8 121.6 108.8 140.8l0 19.2c0 70.4 57.6 134.4 134.4 134.4l563.2 0c70.4 0 134.4-57.6 134.4-134.4L985.6 134.4C979.2 57.6 921.6 0 851.2 0zM153.6 800c-25.6-12.8-44.8-38.4-44.8-70.4 0-32 19.2-57.6 44.8-70.4L153.6 800zM153.6 582.4C128 569.6 108.8 544 108.8 512c0-32 19.2-57.6 44.8-70.4L153.6 582.4zM153.6 358.4C128 352 108.8 320 108.8 294.4c0-32 19.2-57.6 44.8-70.4L153.6 358.4zM812.8 793.6 352 793.6l0-64 460.8 0L812.8 793.6zM812.8 563.2 352 563.2l0-64 460.8 0L812.8 563.2zM812.8 294.4 352 294.4l0-64 460.8 0L812.8 294.4z"
                    fill="#515151"/>
            </svg>
            <Title>
                {props.notebookName}
            </Title>
        </Container>
    )
}

const mapStateToProps = state => ({
    rename: state.status.rename
})

export default connect(mapStateToProps)(Notebook)