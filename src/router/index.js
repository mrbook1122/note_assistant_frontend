import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import {Spin} from "antd";
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'
import {Route} from 'react-router-dom'
import {createHashHistory} from 'history'

import GlobalStyle from "../components/globalStyle";
import Home from "./Home";
import {HashRouter as Router} from "react-router-dom";
import Login from "./Login";
import RegisterComponent from "./Register";

const Container = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
`

let store = {};

//history对象
const history = createHashHistory()

const App = () => {

    //判断是否登录，默认先假设未登录
    const [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
        if (!isLogin) {
            //判断本地是否有token
            let token = localStorage.getItem('token')
            //token为null，直接跳转登录页面
            if (token === null) {
                history.replace('/login')
            } else {
                //请求登录状态
                axios.get('/api/login/status', {
                    headers: {
                        Token: token
                    }
                }).then(resp => {
                    if (resp.data.code !== 200)
                        history.replace('/login')
                    else setIsLogin(true)
                }).catch(err => {
                    history.replace('/login')
                })
            }
        }
    })

    return (
        <>
            <GlobalStyle/>
            <Router>
                <Route path={'/'} exact render={props => <Home isLogin={isLogin}/>}/>
                <Route path={'/login'} render={props => <Login setLogin={setIsLogin}/>}/>
                <Route path={'/register'} component={RegisterComponent}/>
            </Router>>
        </>
    )
}

export default App
