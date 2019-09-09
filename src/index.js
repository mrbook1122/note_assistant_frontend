import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import styled from "styled-components";
import {HashRouter as Router, Route, Link} from "react-router-dom";
import {createHashHistory} from 'history'
import axios from 'axios'
import {Spin} from "antd";

import GlobalStyle from "./components/globalStyle";
import ToolBar from "./components/Toolbar/toolbar";
import Editor from "./components/Editor/index";
import Sider from "./components/Sider/sider";
import Login from './components/Login'
import RegisterComponent from "./components/Register";

const history = createHashHistory()
const base_url = process.env.REACT_APP_BASE_URL

const Container = styled.div`
    height: 100%;
`

const App = () => {
    const [isLogin, setIsLogin] = useState(true)

    useEffect(() => {
        if (!isLogin) {
            let token = localStorage.getItem('Token')

            axios.get(base_url + '/login/status', {
                headers: {
                    Token: token
                }
            })
                .then(resp => {
                    if (resp.data.code !== 200)
                        history.replace('/login')
                    else setIsLogin(true)
                })
                .catch(err => {
                    history.replace('/login')
                })
        }
    })

    if (!isLogin) {
        return (
            <div style={{textAlign: 'center'}}>
                <Spin size={"large"} style={{paddingTop: '100px'}}/>
            </div>
        )
    }

    return (
        <>
            <GlobalStyle/>
            <Container>
                <ToolBar/>
                <Editor/>
            </Container>
            <Sider/>
        </>
    )
}

const RouteComponent = () => {

    return (
        <>
            <GlobalStyle/>
            <Router>
                <Route path={'/'} exact component={App}/>
                <Route path={'/login'} component={Login}/>
                <Route path={'/register'} component={RegisterComponent}/>
            </Router>
        </>
    )
}

ReactDOM.render(
    <RouteComponent/>,
    document.getElementById('root')
)