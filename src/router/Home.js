import React, {useState} from 'react'
import styled from "styled-components";
import {Spin} from "antd";
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import {createHashHistory} from 'history'

import GlobalStyle from "../components/globalStyle";
import ToolBar from "../components/Toolbar";
import Editor from "../components/Editor/index";
import Sider from "../components/Sider";
import VideoSider from "../components/VideoSider";
import AddNotebookDialog from "../components/Sider/AddNotebookDialog";
import reducer from "../reducers";

const Container = styled.div`
    width: 100%;
    position: relative;
`

let state = {
    notebooks: [],
    //是否展示添加标签的对话框
    showAddTag: false
}
let store = createStore(reducer, state, applyMiddleware(thunkMiddleware));

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
            {/*新建笔记本对话框*/}
            <AddNotebookDialog/>
        </Provider>
    )
}

export default Home
