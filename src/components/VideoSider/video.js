import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 300px;
    margin: 10px 0;
`

const Video = props => {
    return (
        <Container>
            <video src={props.url} controls={true} width={'100%'} height={'100%'}/>
        </Container>
    )
}

export default Video