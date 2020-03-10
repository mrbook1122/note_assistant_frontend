/*global chrome*/
import React, {useEffect, useRef, useState} from 'react'
import styled from "styled-components";
import {connect} from 'react-redux'
import axios from 'axios'

import {updateNoteTitle} from "../../actions/note";
import {SiderButton} from "./SiderButton";

const ToolBarContainer = styled.div`
    //height: 100px;
    padding: 10px 10px;
    display: flex;
    align-items: center;
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

    /**
     * 标题输入框赋值
     **/
    const input = useRef(null)
    useEffect(() => {
        if (props.note && props.note.noteId !== -1)
            input.current.value = props.note.title
    }, [props.note])


    /**
     * 设置一个定时器，在一段时间之后更新标题
     **/
    const [timeoutId, setTimeoutId] = useState(0)
    const onChange = e => {
        clearTimeout(timeoutId)
        let title = e.target.value
        let id = setTimeout(() => {
            if (props.note.status === 1) {
                //更新标题
                axios.post('/api/note/' + props.note.noteId + '/title', {
                    title
                }, {
                    headers: {
                        Token: localStorage.getItem('token')
                    }
                }).then(resp => {
                    props.dispatch(updateNoteTitle(title))
                })
            }
        }, 1500)
        setTimeoutId(id)
    }

    if (props.note && props.note.noteId === -1) {
        return (<div>添加一个笔记本开始记笔记</div>)
    }

    return (
        <>
            <ToolBarContainer>
                <SiderButton/>
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