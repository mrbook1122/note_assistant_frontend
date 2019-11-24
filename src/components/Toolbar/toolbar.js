/*global chrome*/
import React, {useEffect, useRef, useState} from 'react'
import styled from "styled-components";
import {connect} from 'react-redux'

import {updateNoteTitle} from "../../actions/note";

const ToolBarContainer = styled.div`
    //height: 100px;
    padding: 10px 10px;
    //display: flex;
    //border: 1px solid black;
    font-size: 1.3rem;
`

//标题
const Title = styled.div`
    margin-top: 1px;
    float: left;
    padding: 0 5px;
    color: #777777;
`

const Input = styled.input`
    outline: none;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, .3);
`

const ToolBar = props => {

    // const [videoSiderVisible, setVideoSiderVisible] = useState(false)
    // const showVideoSider = () => {
    //     let videoSider = document.getElementById('videoSider')
    //     const visible = videoSiderVisible ? 'hidden' : 'visible'
    //     if (videoSider) {
    //         videoSider.style.visibility = visible
    //         setVideoSiderVisible(!videoSiderVisible)
    //     }
    // }
    const input = useRef(null)
    useEffect(() => {
        if (props.note && props.note.noteId !== -1)
            input.current.value = props.note.title
    }, [props.note])
    const onChange = e => {
        // props.dispatch(updateNoteTitle(props.currentNote.id, e.target.value))
    }

    if (props.note && props.note.noteId === -1) {
        return (<div>添加一个笔记本开始记笔记</div>)
    }

    return (
        <>
            <ToolBarContainer>
                {/*<Avatar icon={'user'}/>*/}
                {/*<Button type={"primary"} onClick={props.changeVideoId}*/}
                {/*        style={{marginRight: '10px'}}*/}
                {/*        id={'tabRecorderButton'}>录Tab</Button>*/}
                {/*<Button type={"primary"} onClick={props.changeVideoId}*/}
                {/*        style={{marginRight: '10px'}}*/}
                {/*        id={'desktopRecorderButton'}>录桌面</Button>*/}
                {/*<Button type={"primary"} onClick={props.changeVideoId}*/}
                {/*        style={{marginRight: '10px'}}*/}
                {/*        id={'videoRecorderButton'}>录视频</Button>*/}
                {/*<Button type={"primary"} onClick={props.changeVideoId}*/}
                {/*        style={{marginRight: '10px'}}*/}
                {/*        id={'cut'}>截屏</Button>*/}
                {/*<Button type={"primary"} icon={'video-camera'} onClick={showVideoSider}/>*/}
                {/*<a href={'https://mrbook1122.github.io'} target={'_blank'}>安装离线应用</a>*/}
                <Title>标题</Title>
                <Input onChange={onChange} ref={input}/>
            </ToolBarContainer>
        </>
    )
}

const mapStateToProps = state => {
    let notebook = state.notebooks.find(notebook => notebook.select)
    if (notebook === undefined)
    //返回id:-1表示未选择笔记本
        return {note: {noteId: -1}}
    let note = notebook.notes.find(note => note.select)
    return {note}
}

export default connect(mapStateToProps)(ToolBar)