import React, {useState} from 'react'
import styled, {keyframes} from "styled-components";

import Right from '../../icons/next.png'
import NoteList from "./NoteList";
import NotebookList from "./NotebookList";
import Button from "./button";
import Top from "./Top";

//侧边栏进场动画
const slideInLeft = keyframes`
    from {
        transform: translate3d(-100%, 0, 0);
        visibility: visible;
    }
    to {
        transform: translate3d(0, 0, 0);
    }
`

const rotateIn = keyframes`
    from {
        transform-origin: center;
        transform: rotate3d(0, 0, 0);
        opacity: 0;
    }

    to {
        transform-origin: center;
        transform: rotate3d(0, 0, 1, 180deg);
        opacity: 1;
    }
`

const slideOutLeft = keyframes`
    from {
        transform: translate3d(0, 0, 0);
        visibility: visible;
    }
    to {
        transform: translate3d(-100%, 0, 0);
    }
`

const Flag = styled.div`
    width: 25px;
    height: 25px;
    background: url(${Right});
    background-size: cover;
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 5;
    visibility: visible;
    
`

const SiderContainer = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 350px;
    z-index: 100;
    background: #f1f1f1;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    visibility: hidden;
    user-select: none;
    animation-name: ${props => props.animation};
    animation-duration: 0.8s;
    :hover {
        //animation: ${slideInLeft} 0.8s both;
        visibility: visible;
        ${Flag} {
            visibility: hidden;
        }
    }
    
`

// 侧边栏
const Sider = () => {
    const [siderAnimation, setSiderAnimation] = useState(null)
    const [flagAnimation, setFlagAnimation] = useState(null)
    const [animationEnd, setAnimationEnd] = useState(true)
    const [hover, setHover] = useState(false)
    const [isIn, setIn] = useState(true)

    const mouseEnter = () => {
        setHover(true)

        setAnimationEnd(false)
        // setFlagAnimation(rotateIn)
        setSiderAnimation(slideInLeft)
        setIn(false)
    }

    const mouseLeave = () => {
        setHover(false)
        if (animationEnd) {
            setAnimationEnd(false)
            setSiderAnimation(slideOutLeft)
            setIn(true)
        }
    }

    const onAnimationEnd = () => {
        setAnimationEnd(true)
        // setSiderAnimation(null)
        // setFlagAnimation(null)

        if (!hover && !isIn) {
            console.log('animation')
            setAnimationEnd(false)
            setSiderAnimation(slideOutLeft)
            setIn(true)
        }
    }

    //点击切换显示笔记本列表、回收站、收藏
    const [notebookListVisible, setNotebookListVisible] = useState(false)
    const clickNotebook = () => {
        setNotebookListVisible(!notebookListVisible)
    }

    return (
        <>
            <SiderContainer animation={siderAnimation}
                            onMouseEnter={mouseEnter}
                            onMouseLeave={mouseLeave}
                            onAnimationEnd={onAnimationEnd}>
                <Top/>
                <div style={{
                    height: 'calc(100% - 90px)', width: '100%'
                    , display: 'flex'
                }}>
                    <NotebookList/>
                    <NoteList/>
                </div>
                {/*<NotebookList visible={notebookListVisible}/>*/}
                {/*添加标签、笔记按钮*/}
                <Button/>
                <Flag/>
            </SiderContainer>
        </>
    )
}

export default Sider