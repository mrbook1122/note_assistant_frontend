import React, {useState} from "react";
import styled from "styled-components";
import {connect} from 'react-redux'

import {closeAddTag} from "../../actions";

const Container = styled.div`
    width: 100%;
    height: 100%;
    z-index: 100;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(255, 255, 255, 0.3);
`

const Dialog = styled.div`
    width: 350px;
    height: 200px;
    background: #eeeeee;
    margin: 200px auto 0;
`

const AddTag = props => {
    const [value, setValue] = useState('')
    const change = e => {
        setValue(e.target.value)
    }
    console.log(props.show)
    if (!props.show)
        return null
    return (
        <Container>
            <Dialog>
                <div>please input tag name</div>
                <input value={value} onChange={change}/>
                <div>
                    {/*添加笔记本*/}
                    <button>ok</button>
                    <button onClick={props.close}>cancel</button>
                </div>
            </Dialog>
        </Container>
    )
}

const mapStateToProps = state => ({
    show: state.showAddTag
})

const mapDispatchToProps = dispatch => ({
    close: () => dispatch(closeAddTag())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTag)