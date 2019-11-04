import React, {useEffect, useState} from "react";
import styled from "styled-components";

import Video from "./video";

const Container = styled.div`
    height: 100%;
    width: 500px;
    position: absolute;
    right: 0;
    top: 0;
    border: 1px solid black;
    z-index: 10;
    overflow: auto;
    visibility: hidden;
    ::-webkit-scrollbar {
       width: 5px;
       background-color: #fdfdfd;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #1890ff;
    }
`

const VideoSider = props => {

    const [url, setUrl] = useState([])
    useEffect(() => {
        let request = indexedDB.open('db', 1)
        request.onupgradeneeded = ev => {
            let db = ev.target.result;
            console.log('initialize success')
            let objectStore = db.createObjectStore('videos', {keyPath: 'id', autoIncrement: true});
            objectStore.createIndex('webm', '', {unique: false});
        }
        request.onsuccess = () => {
            let db = request.result
            let objectStore = db.transaction(['videos']).objectStore('videos')
            let url = []
            objectStore.getAll().onsuccess = e => {
                let data = e.target.result
                let url = []
                data.map(item => {
                    url.push(URL.createObjectURL(item.webm))
                })
                setUrl(url)
            }
        }
    }, [props.id])

    return (
        <Container id={'videoSider'}>
            {
                url.map((item, index) => <Video url={item} key={item}/>)
            }
        </Container>
    )
}

export default VideoSider