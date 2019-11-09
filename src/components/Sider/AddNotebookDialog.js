import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {connect} from 'react-redux'
import {message} from "antd";

import {closeAddTag, addNotebook} from "../../actions";

const Container = styled.div`
    width: 100%;
    height: 100%;
    z-index: 100;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(255, 255, 255, 0.8);
`

const Dialog = styled.div`
    width: 350px;
    height: 210px;
    background: #eeeeee;
    margin: 200px auto 0;
    border-radius: 20px;
    box-shadow: 0 5px 16px 0 rgba(0,0,0,0.2);
    user-select: none;
`

const styles = {
    h1: {
        textAlign: 'center',
        padding: '15px'
    },
    buttons: {
        width: '60%',
        margin: '20px auto 0'
    },
    button: {
        width: '80px',
        background: 'none',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        padding: '5px',
        borderRadius: '5px'
    }
}

//笔记本名称输入框样式
const Input = styled.input`
    border: none;
    outline: none;
    background: none;
    text-align: center;
    ::placeholder {
        color: #aaa;
    }
`

const AddNotebookDialog = props => {
    //获取输入的笔记本名称
    const [value, setValue] = useState('')
    const change = e => {
        setValue(e.target.value)
    }

    //获取输入框的引用，得到焦点
    const input = useRef(null)
    useEffect(() => {
        if (input.current) {
            input.current.focus()
        }
    })

    //添加笔记本
    const add = () => {
        props.dispatch(addNotebook(value));
        //清空输入框
        setValue('')
    }

    //如果笔记本已存在，发出警告
    useEffect(() => {
        if (props.isWarn) {
            message.warn('笔记本已存在！')
        }
    })

    //关闭对话框
    const close = () => {
        props.dispatch(closeAddTag());
        //清空输入框
        setValue('')
    }

    if (!props.show)
        return null
    return (
        <Container>
            <Dialog>
                <h1 style={styles.h1}>新建笔记本</h1>
                <div style={{
                    textAlign: 'center', padding: '0 0 15px', fontSize: '22px',
                    width: '80%',
                    margin: '0 auto',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.2)'
                }}>
                    <Input value={value} onChange={change} placeholder={'笔记本名称'} ref={input}/>
                </div>
                <div style={styles.buttons}>
                    {/*添加笔记本*/}
                    <button onClick={add}
                            style={{...styles.button, backgroundColor: '#00a7de', color: 'white'}}>创建
                    </button>
                    <button onClick={close}
                            style={{...styles.button, float: 'right', backgroundColor: 'white'}}>取消
                    </button>
                </div>
            </Dialog>
        </Container>
    )
}

const mapStateToProps = state => ({
    show: state.showAddTag,
    //是否发出笔记本已存在的警告
    isWarn: state.addNotebookResult.resultCode === 400
})

export default connect(mapStateToProps)(AddNotebookDialog)