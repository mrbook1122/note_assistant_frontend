import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {connect} from 'react-redux'

import Notebook from "./Notebook";
import {fetchNotebooks, deleteNotebook} from "../../actions";

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

const MenuContainer = styled.div`
    width: 150px;
    position: absolute;
    border: 1px solid rgba(0, 0, 0, 0.3);
    background: #fff;
    left: 20px;
    z-index: 2000;
    visibility: hidden;
    font-size: 17px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
`

const MenuItemContainer = styled.div`
    :hover {
        background: #f1f1f1;
        cursor: default;
    }
`

//笔记本上单击右键展示的右键菜单
const ContextMenu = props => {
    return (
        <MenuContainer id={'menu'}>
            <MenuItemContainer
                onClick={props.deleteNotebook}
                style={{padding: '3px 15px', display: 'flex', borderBottom: '1px solid rgba(0, 0, 0, 0.05)'}}>
                <div style={{marginTop: '2px', marginRight: '9px'}}>
                    <svg t="1567771486370" className="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="8227" width="22" height="22">
                        <path
                            d="M780.8 710.4 582.4 505.6l198.4-198.4c19.2-19.2 19.2-51.2 0-70.4-19.2-19.2-51.2-19.2-70.4 0L518.4 441.6 313.6 243.2c-19.2-19.2-51.2-19.2-76.8 0-19.2 19.2-19.2 51.2 0 76.8l198.4 198.4-198.4 198.4c-19.2 19.2-19.2 51.2 0 70.4 19.2 19.2 51.2 19.2 70.4 0l198.4-198.4 198.4 198.4c19.2 19.2 51.2 19.2 76.8 0C806.4 761.6 806.4 729.6 780.8 710.4z"
                            p-id="8228" fill="#d81e06"></path>
                    </svg>
                </div>
                <div>
                    删除笔记本
                </div>
            </MenuItemContainer>
            <MenuItemContainer
                style={{padding: '3px 18px', display: 'flex', borderBottom: '1px solid rgba(0, 0, 0, 0.05)'}}>
                <div style={{marginTop: '2px', marginRight: '9px'}}>
                    <svg t="1567771707839" className="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="9113" width="18" height="18">
                        <path
                            d="M949.2 63.44c-33.696-32.4-70.88-48.832-110.576-48.832-62.064 0-107.344 40.224-119.728 52.56C701.488 84.48 106.832 681.488 106.832 681.488c-3.888 3.92-6.72 8.8-8.176 14.176-13.424 49.728-80.592 270.416-81.264 272.624-3.456 11.296-0.384 23.616 7.92 31.936 5.984 5.952 13.936 9.168 22.08 9.168 3.2 0 6.432-0.496 9.6-1.52 2.288-0.752 229.248-74.384 266.608-85.568 4.912-1.472 9.424-4.16 13.072-7.792 23.6-23.408 578.224-573.824 615.04-611.968 38.08-39.392 56.992-80.384 56.256-121.872C1007.248 139.712 987.472 100.272 949.2 63.44zM285.472 744.288c-32.368-32.736-65.296-51.216-90.688-61.616 109.2-109.632 394.464-396 514.272-516.208 15.632 3.76 52.768 16.16 90.912 54.784 38.528 38.992 48.8 83.472 50.672 93.344-121.632 121.44-401.616 399.44-512 509.008C328.432 799.776 311.968 771.088 285.472 744.288zM152.736 735.104c16.96 4.512 52.272 17.6 88.32 54.08 27.76 28.096 40.8 58.992 46.656 77.856-43.008 13.872-137.152 46.48-196.976 65.84C108.48 874.336 138.4 783.2 152.736 735.104zM906.832 258.16c-1.264 1.312-3.36 3.424-5.856 5.968-9.776-25.28-26.928-57.728-56.624-87.792-30.336-30.704-61.12-48.8-85.792-59.52 2.096-2.096 3.728-3.728 4.368-4.368 3.536-3.504 35.664-34.32 75.696-34.32 23.056 0 45.68 10.544 67.296 31.344 25.632 24.672 38.848 49.024 39.28 72.368C945.616 205.696 932.72 231.36 906.832 258.16z"
                            fill="#13227a" p-id="9114"></path>
                    </svg>
                </div>
                <div>
                    重命名
                </div>
            </MenuItemContainer>
            <MenuItemContainer style={{padding: '3px 18px', display: 'flex'}}>
                <div style={{marginTop: '2px', marginRight: '9px'}}>
                    <svg t="1567772706973" className="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="10209" width="18" height="18">
                        <path
                            d="M512 0a512 512 0 0 0 0 1024c180.224 0-110.592-204.8 204.8-204.8a302.08 302.08 0 0 0 307.2-307.2A512 512 0 0 0 512 0zM179.2 486.4A76.8 76.8 0 1 1 256 409.6a76.8 76.8 0 0 1-76.8 76.8zM358.4 307.2a76.8 76.8 0 1 1 76.8-76.8A76.8 76.8 0 0 1 358.4 307.2z m307.2 0a76.8 76.8 0 1 1 76.8-76.8A76.8 76.8 0 0 1 665.6 307.2z m179.2 179.2A76.8 76.8 0 1 1 921.6 409.6a76.8 76.8 0 0 1-76.8 76.8z"
                            p-id="10210"></path>
                    </svg>
                </div>
                <div>
                    笔记本颜色
                </div>
            </MenuItemContainer>
        </MenuContainer>
    )
}

//笔记右键菜单
const NoteContextMenu = props => {
    return (
        <MenuContainer id={'note-menu'}>
            <MenuItemContainer
                style={{padding: '3px 15px', display: 'flex', borderBottom: '1px solid rgba(0, 0, 0, 0.05)'}}>
                <div style={{marginTop: '2px', marginRight: '9px'}}>
                    <svg t="1567771486370" className="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="8227" width="22" height="22">
                        <path
                            d="M780.8 710.4 582.4 505.6l198.4-198.4c19.2-19.2 19.2-51.2 0-70.4-19.2-19.2-51.2-19.2-70.4 0L518.4 441.6 313.6 243.2c-19.2-19.2-51.2-19.2-76.8 0-19.2 19.2-19.2 51.2 0 76.8l198.4 198.4-198.4 198.4c-19.2 19.2-19.2 51.2 0 70.4 19.2 19.2 51.2 19.2 70.4 0l198.4-198.4 198.4 198.4c19.2 19.2 51.2 19.2 76.8 0C806.4 761.6 806.4 729.6 780.8 710.4z"
                            p-id="8228" fill="#d81e06"></path>
                    </svg>
                </div>
                <div>
                    删除笔记
                </div>
            </MenuItemContainer>
        </MenuContainer>
    )
}

const NotebookList = props => {

    //全局点击之后隐藏右键菜单
    useEffect(() => {
        let menu = document.getElementById('menu')
        if (menu) {
            document.addEventListener('click', () => {
                menu.style.visibility = 'hidden'
            })
        }
        let noteMenu = document.getElementById('note-menu')
        if (noteMenu) {
            document.addEventListener('click', () => {
                noteMenu.style.visibility = 'hidden'
            })
        }
    })

    //初始化笔记本列表
    const [init, setInit] = useState(false)
    useEffect(() => {
        if (!init) {
            props.dispatch(fetchNotebooks())
            setInit(true)
        }
    })

    /**
     * 删除一个笔记本
     */
    const deleteNotebook = () => {
        props.dispatch()
    }

    return (
        <div style={{position: 'relative'}}>
            <ContextMenu dispatch={props.dispatch} deleteNotebook={deleteNotebook}/>
            <NoteContextMenu/>
            <Container>
                {props.notebooks.map((notebook, index) => {
                    //如果是当前笔记本，则标记为select
                    return <Notebook select={notebook.select}
                                     id={notebook.notebookId}
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