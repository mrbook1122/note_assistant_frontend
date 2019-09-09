import React from "react";
import styled from "styled-components";

const Container = styled.button`
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    border: none;
    background: ${props => props.select ? '#bbb' : 'transparent'};
    
    :hover {
        background: #eee;
    }
    
    :focus {
        outline: none;
        background: #bbb;
    }
`

const Title = styled.div`
    margin-left: 5px;
    font-size: 15px;
    line-height: normal;
`

function TagItem(props) {

    const contextMenu = e => {
        e.preventDefault()
        let menu = document.getElementById('menu')
        if (menu) {
            menu.style.visibility = 'visible'
            menu.style.left = e.clientX + 'px'
            menu.style.top = e.clientY - 50 + 'px'
        }
    }

    return (
        <>
            <Container select={props.select} onContextMenu={contextMenu}>
                <svg className="icon" viewBox="0 0 1024 1024"
                     width="20" height="20">
                    <path d="M194.889274 0v1024l317.082033-224.864391 317.139419 224.864391V0z" p-id="7176"></path>
                </svg>
                <Title>
                    你你你你你你
                </Title>
            </Container>
        </>
    )
}

export default TagItem