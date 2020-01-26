import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {connect} from 'react-redux'

import Notebook from "./Notebook";
import {fetchNotebooks} from "../../../actions";
import {NotebookContextMenu} from "../ContextMenu";

const Container = styled.div`
    width: 179px;
    overflow: auto;
    height: 100%;
    z-index: 10;
    background: #fdfdfd;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    ::-webkit-scrollbar {
       width: 2px;
       background-color: #fdfdfd;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: gray;
    }
`

const NotebookList = props => {
    const notebookMenu = useRef(null)

    // 全局点击之后隐藏右键菜单
    useEffect(() => {
        let listener = () => {
            notebookMenu.current.style.visibility = 'hidden'
        }
        document.addEventListener('click', listener)
        return () => {
            document.removeEventListener('click', listener)
        }
    }, [])

    // 初始化笔记本列表
    useEffect(() => {
        props.dispatch(fetchNotebooks())
    }, [])

    return (
        <div style={{position: 'relative'}}>
            <NotebookContextMenu ref={notebookMenu} dispatch={props.dispatch}/>
            <Container>
                {props.notebooks.map((notebook, index) => {
                    //如果是当前笔记本，则标记为select
                    return <Notebook select={notebook.select}
                                     id={notebook.notebookId}
                                     menu={notebookMenu}
                                     notebookName={notebook.name} key={index}/>
                })}

            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    notebooks: state.notebooks
})

export default connect(mapStateToProps)(NotebookList)