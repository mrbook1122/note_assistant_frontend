import React from "react";
import styled, {keyframes} from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 5px 15px;
    background-color: white;
`

const LoadingAnimation = keyframes`
    0% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0 50%;
    }
`

const SkeletonContainer = styled.div`
    width: ${props => props.width};
    height: 20px;
    background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
    background-size: 400%;
    margin-top: 20px;
    animation: ${LoadingAnimation} 1.4s ease infinite;
    border-radius: 8px;
`

/**
 * 骨架屏
 */
const Skeleton = () => {
    return (
        <Container>
            <SkeletonContainer width={'50%'}/>
            <SkeletonContainer width={'70%'}/>
            <SkeletonContainer width={'55%'}/>
            <SkeletonContainer width={'45%'}/>
            <SkeletonContainer width={'75%'}/>
            <SkeletonContainer width={'75%'}/>
            <SkeletonContainer width={'85%'}/>
            <SkeletonContainer width={'40%'}/>
        </Container>
    )
}

export default Skeleton