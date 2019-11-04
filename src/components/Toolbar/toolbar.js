/*global chrome*/
import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import {Avatar, Button, Icon} from "antd";

const ToolBarContainer = styled.div`
    height: 100px;
    padding: 10px 10px;
    //border: 1px solid black;
`

const ToolBar = props => {

    const [videoSiderVisible, setVideoSiderVisible] = useState(false)
    const showVideoSider = () => {
        let videoSider = document.getElementById('videoSider')
        const visible = videoSiderVisible ? 'hidden' : 'visible'
        if (videoSider) {
            videoSider.style.visibility = visible
            setVideoSiderVisible(!videoSiderVisible)
        }
    }

    return (
        <>
            <ToolBarContainer>
                {/*<Avatar icon={'user'}/>*/}
                <Button type={"primary"} onClick={props.changeVideoId}
                        style={{marginRight: '10px'}}
                        id={'tabRecorderButton'}>录Tab</Button>
                <Button type={"primary"} onClick={props.changeVideoId}
                        style={{marginRight: '10px'}}
                        id={'desktopRecorderButton'}>录桌面</Button>
                <Button type={"primary"} onClick={props.changeVideoId}
                        style={{marginRight: '10px'}}
                        id={'videoRecorderButton'}>录视频</Button>
                <Button type={"primary"} onClick={props.changeVideoId}
                        style={{marginRight: '10px'}}
                        id={'cut'}>截屏</Button>
                <Button type={"primary"} icon={'video-camera'} onClick={showVideoSider}/>
                <a href={'https://mrbook1122.github.io'} target={'_blank'}>安装离线应用</a>
            </ToolBarContainer>
        </>
    )
}

export default ToolBar