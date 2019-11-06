//顶部显示当前选择的是笔记本列表，还是回收站，收藏
import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {connect} from 'react-redux'

const Container = styled.div`
    width: 100%;
    height: 50px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    line-height: 48px;
    padding: 0 10px;
    display: flex;
    font-size: 18px;
    font-weight: bold;
    cursor: default;
    :hover {
        background: #ddd;
    }
    z-index: 500;
    position: relative;
`

const Top = props => {


    return (
        <Container onClick={props.click}>
            <div style={{marginLeft: '2px'}}>
                笔记本列表
            </div>
            <div style={{marginTop: '3px', marginLeft: '8px'}}>
                <svg className="icon" viewBox="0 0 1024 1024"
                     width="16" height="16">
                    <path
                        d="M105.19329 339.56414l61.86318-61.86318 406.865311 406.865311-61.86318 61.86318-406.865311-406.865311Z"
                        p-id="1979"></path>
                    <path
                        d="M856.93607 277.560833l61.86318 61.86318-406.865311 406.865311-61.86318-61.86318 406.865311-406.865311Z"
                        p-id="1980"></path>
                </svg>
            </div>
        </Container>
    )
}

export default Top