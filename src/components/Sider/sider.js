import React, {useState} from 'react'
import styled, {keyframes} from "styled-components";

import Right from '../../icons/next.png'

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
        transform: rotate3d(0, 0, 1, -200deg);
        opacity: 0;
    }

    to {
        transform-origin: center;
        transform: translate3d(0, 0, 0);
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
    left: ${props => props.animation ? '100%' : 0};
    animation-name: ${props => props.animation};
    animation-duration: 0.8s;
    z-index: 1000;
    visibility: visible;
`

const SiderContainer = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100px;
    z-index: 10;
    background: red;
    visibility: hidden;
    animation-name: ${props => props.animation};
    animation-duration: 0.8s;
    :hover {
        //animation: ${slideInLeft} 0.8s both;
        visibility: visible;
        ${Flag} {
            left: 100%;
        }
    }
`

const styles = {
    con: {
        width: '100%',
        height: '100%',
        position: 'relative'
    }
}

const Sider = () => {
    const [siderAnimation, setSiderAnimation] = useState(null)
    const [flagAnimation, setFlagAnimation] = useState(null)
    const [animationEnd, setAnimationEnd] = useState(true)
    const [hover, setHover] = useState(false)
    const [isIn, setIn] = useState(true)

    const mouseEnter = () => {
        setHover(true)
        setAnimationEnd(false)
        setFlagAnimation(rotateIn)
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
        setSiderAnimation(null)
        setFlagAnimation(null)
        if (!hover && !isIn) {
            setSiderAnimation(slideOutLeft)
            setIn(true)
        }
    }

    return (
        <>
            <SiderContainer animation={siderAnimation}
                            onMouseEnter={mouseEnter}
                            onMouseLeave={mouseLeave}
                            onAnimationEnd={onAnimationEnd}>
                <div style={styles.con}>
                    <Flag animation={flagAnimation}/>
                </div>
            </SiderContainer>
        </>
    )
}

export default Sider