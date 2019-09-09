import React, {useState, useEffect} from "react";
import styled, {keyframes} from "styled-components";

const slideDown = keyframes`
    from {
        transform: translate3d(0, -50%, 0);
        opacity: 0.5;
    }
    to {
        transform: translate3d(0, 0, 0);
    }
`

//总容器
const NotebookContainer = styled.div`
    width: 100%;
    position: absolute;
    top: 50px;
    height: calc(100% - 50px);
    left: 0;
    visibility: hidden;
    animation-name: ${props => props.animation};
    animation-duration: 0.3s;
`

//笔记本列表容器
const NotebookListContainer = styled.div`
    width: 100%;
    height: calc(100% - 40px);
    background: #fdfdfd;
    z-index: 200;
`

//按钮容器
const ItemContainer = styled.div`
    :hover {
        background: #ddd;
    }
`
const AddNotebookContainer = styled.div`
    width: 100%;
    height: 40px;
    background: #f1f1f1;
    :hover {
        background: #ddd;
    }
    line-height: 40px;
    font-weight: bold;
`

const NotebookList = props => {
    const [notebookAnimation, setNotebookAnimation] = useState(null)
    const notebookAnimationEnd = () => {
        setNotebookAnimation(null)
    }
    useEffect(() => {
        let notebook = document.getElementById('notebook')
        if (props.visible) {
            setNotebookAnimation(slideDown)
            notebook.style.visibility = 'visible'
        } else {
            notebook.style.visibility = 'hidden'
        }
    }, [props.visible])

    return (
        <NotebookContainer id={'notebook'} animation={notebookAnimation}
                           onAnimationEnd={notebookAnimationEnd}>
            <NotebookListContainer/>
            <AddNotebookContainer>
                <ItemContainer style={{display: 'flex'}}>
                    <div style={{margin: '8px 5px 0', lineHeight: 'normal'}}>
                        <svg className="icon" viewBox="0 0 1024 1024"
                             width="24" height="24">
                            <path
                                d="M480.256 128l0 768 62.464 0 1.024-768-63.488 0zM896 480.256l-768 0 0 62.464 768 1.024 0-63.488z"
                                fill="" p-id="2704"></path>
                        </svg>
                    </div>
                    新建笔记本
                </ItemContainer>
            </AddNotebookContainer>
        </NotebookContainer>
    )
}

export default NotebookList