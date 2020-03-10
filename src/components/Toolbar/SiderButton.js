import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    :hover {
        background: #eeeeee;
        border-radius: 50%;
    }
`

// 控制侧边栏显示或隐藏的按钮
const SiderButton = props => {
    return (
        <Container>
            <svg viewBox="0 0 24 24" width={25}>
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
        </Container>
    )
}

export {
    SiderButton
}