import React from 'react'
import styled from "styled-components";
import {Avatar} from "antd";

const ToolBarContainer = styled.div`
    height: 100px;
    margin: 10px 10px;
    border: 1px solid black;
`

const ToolBar = () => {
    return (
        <>
            <ToolBarContainer>
                <Avatar icon={'user'}/>
            </ToolBarContainer>
        </>
    )
}

export default ToolBar