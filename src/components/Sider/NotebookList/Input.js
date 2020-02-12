import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";

import {changeNotebookName} from "../../../actions";

const InputContainer = styled.input`
    width: 0;
    flex-grow: 1;
    margin-left: 5px;
`

const Input = props => {

    const [value, setValue] = useState(props.notebookName)
    const change = e => {
        setValue(e.target.value)
    }

    const blur = () => {
        rename()
    }

    // 重命名操作，需要判断是否存在同名的笔记本
    const rename = () => {
        props.dispatch(changeNotebookName(value))
    }

    // 输入框获取焦点
    const input = useRef(null)
    useEffect(() => {
        input.current.focus()
        const listener = e => {
            if (e.keyCode === 13) {
                rename()
            }
        }
        document.addEventListener('keydown', listener)
        return () => {
            document.removeEventListener('keydown', listener)
        }
    }, [])

    return (
        <InputContainer value={value} onChange={change} onBlur={blur} ref={input}/>
    )
}

export default Input