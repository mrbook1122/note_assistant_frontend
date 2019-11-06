import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import {Spin} from "antd";
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'
import {createHashHistory} from 'history'

import GlobalStyle from "../components/globalStyle";
import ToolBar from "../components/Toolbar/toolbar";
import Editor from "../components/Editor/index";
import Sider from "../components/Sider/sider";
import VideoSider from "../components/VideoSider";
import AddTag from "../components/Sider/AddTag";
import reducer from "../reducers";

const Container = styled.div`
    width: 100%;
    position: relative;
`

let preloadedState = {showAddTag: false};
let state = {
    notebooks: [
        {
            notebookName: 'default',
            id: 1,
            notes: [
                {id: 1, title: 'title', content: '', updateTime: '2019'}
            ]
        },
        {
            notebookName: 'test',
            id: 1,
            notes: [
                {id: 1, title: 'title', content: '', updateTime: '2019'}
            ]
        }
    ],
    currentNotebook: 'default',
    //是否展示添加标签的对话框
    showAddTag: false,
}
let store = createStore(reducer, state);

//history对象
const history = createHashHistory()

const Home = props => {

    const [videoId, setVideoId] = useState(0)
    const changeVideoId = () => {
        setVideoId(videoId + 1)
    }

    //首页
    //如果未登录则展示一个spin
    if (!props.isLogin) {
        return (
            <div style={{textAlign: 'center'}}>
                <Spin size={"large"} style={{paddingTop: '100px'}}/>
            </div>
        )
    }

    return (
        <Provider store={store}>
            <GlobalStyle/>
            <Container>
                <ToolBar changeVideoId={changeVideoId}/>
                <Editor/>
            </Container>
            <Sider/>
            <VideoSider id={videoId}/>
            <AddTag/>
        </Provider>
    )
}

export default Home
