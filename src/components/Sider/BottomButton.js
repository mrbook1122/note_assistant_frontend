import React from "react";
import styled from "styled-components";
import {connect} from 'react-redux'

import {showAddTag} from '../../actions'
import {addNote} from "../../actions/note";

const Container = styled.div`
    height: 40px;
    width: 100%;
    display: flex;
    line-height: 40px;
    font-weight: bold;
    cursor: default;
`

const ItemContainer = styled.div`
    :hover {
        background: #ddd;
    }
    cursor: pointer;
`

// 侧边栏底部，添加笔记本和新建笔记的按钮
const Button = props => {

    return (
        <Container>
            <ItemContainer style={{width: '180px', display: 'flex', borderRight: '1px solid rgba(0, 0, 0, 0.1)'}}
                           onClick={props.addTag}>
                <div style={{margin: '8px 5px 0', lineHeight: 'normal'}}>
                    <svg className="icon" viewBox="0 0 1024 1024"
                         width="24" height="24">
                        <path
                            d="M480.256 128l0 768 62.464 0 1.024-768-63.488 0zM896 480.256l-768 0 0 62.464 768 1.024 0-63.488z"
                            fill="" p-id="2704"></path>
                    </svg>
                </div>
                添加笔记本
            </ItemContainer>
            <ItemContainer style={{width: '170px', display: 'flex'}} onClick={() => props.dispatch(addNote(''))}>
                <div style={{margin: '8px 5px 0', lineHeight: 'normal'}}>
                    <svg className="icon" viewBox="0 0 1024 1024"
                         width="24" height="24">
                        <path
                            d="M480.256 128l0 768 62.464 0 1.024-768-63.488 0zM896 480.256l-768 0 0 62.464 768 1.024 0-63.488z"
                            fill="" p-id="2704"></path>
                    </svg>
                </div>
                新建笔记
            </ItemContainer>
        </Container>
    )
}

const mapDispatchToProps = dispatch => ({
    addTag: () => dispatch(showAddTag()),
    dispatch
})

let BottomButton = connect(null, mapDispatchToProps)(Button)

export {
    BottomButton
}