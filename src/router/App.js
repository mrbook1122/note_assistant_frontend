import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import {Spin} from "antd";
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import GlobalStyle from "../components/globalStyle";
import ToolBar from "../components/Toolbar/toolbar";
import Editor from "../components/Editor/index";
import Sider from "../components/Sider/sider";
import VideoSider from "../components/VideoSider";
import AddTag from "../components/Sider/AddTag";

import reducer from "../reducers";

const Container = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
`

let preloadedState = {showAddTag: false};
let store = null;

const App = () => {

    //读取数据库
    const [initDB, setInitDB] = useState(false)
    useEffect(() => {
        if (!initDB) {
            let request = indexedDB.open('note', 1)

            request.onsuccess = e => {
                let db = e.target.result;
                let transaction = db.transaction('notes', 'readwrite')
                new Promise((resolve, reject) => {
                    // 1 从数据库读取笔记本列表，如果为空，则创建一个默认笔记本
                    let notebookOS = transaction.objectStore('notes')
                    let notebookRequest = notebookOS.getAll()
                    notebookRequest.onsuccess = (e) => {
                        let list = e.target.result;
                        //数据库中没有任何数据
                        if (list.length === 0) {
                            let item = {notebook: '默认笔记本', tags: []}
                            // 创建默认笔记本
                            notebookOS.add(item)
                            preloadedState.notes = [{notebook: '默认笔记本', tags: []}]
                            preloadedState.currentNotebook = '默认笔记本'
                            return reject()
                        }
                        // 读取数据库中的数据
                        preloadedState.notes = list
                        preloadedState.currentNotebook = list[0].notebook;
                        resolve()
                    }
                }).then(() => {

                }, () => {}).finally(() => {
                    store = createStore(reducer, preloadedState, applyMiddleware(thunkMiddleware))
                    setInitDB(true)
                })

            }

            request.onupgradeneeded = e => {
                let db = e.target.result
                let objectStore = db.createObjectStore('notes',
                    {keyPath: 'id', autoIncrement: true})
                objectStore.createIndex('notebook', 'notebook')
            }
        }
    }, [initDB])

    const [videoId, setVideoId] = useState(0)
    const changeVideoId = () => {
        setVideoId(videoId + 1)
    }

    if (!initDB) {
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

export default App
