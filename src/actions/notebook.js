import axios from "axios";
import {message} from "antd";

import {closeAddTag} from "./actions";

// 更改笔记本名称
export const CHANGE_NOTEBOOK_NAME = 'CHANGE_NOTEBOOK_NAME'
export const changeNotebookName = newName => {
    return (dispatch, getState) => {
        let repeated = false
        let notebookId
        let notebooks = getState().notebooks.map(n => {
            if (n.select) {
                notebookId = n.notebookId
                // 判断是否命名重复
                if (n.name === newName) {
                    repeated = true
                }
                return {...n, name: newName}
            } else return {...n}
        })

        // 如果输入的新笔记本名字与已有的笔记本名称重复，则不进行重命名
        if (repeated) {
            dispatch({
                type: 'RENAME',
                rename: false
            })
            message.error('笔记本名称已存在')
            return
        }

        // 更改笔记本名称
        dispatch({
            type: CHANGE_NOTEBOOK_NAME,
            notebooks
        })

        // 发送ajax请求更改数据
        let params = new URLSearchParams()
        params.append('name', newName)
        axios.post('/api/notebook/' + notebookId, params, {
            headers: {
                Token: localStorage.getItem('token')
            }
        })
    }
}

/**
 * 初始化笔记本的笔记列表
 */
export const FETCH_NOTE_LIST = 'FETCH_NOTE_LIST'
export const fetchNotes = () => {
    return function (dispatch, getState) {
        /**
         * 先获取当前的笔记本，如果未选中笔记本或者笔记本的笔记列表已经获取，则退出函数
         * 1. 先获取笔记列表
         * 2. 选择笔记列表中的第一条笔记
         */
        let notebook = getState().notebooks.find(notebook => notebook.select)
        if (notebook === undefined)
            return;
        if (notebook.status === 1)
            return;
        axios.get('/api/notebook/' + notebook.notebookId + '/note/list', {
            headers: {
                Token: localStorage.getItem('token')
            }
        }).then(resp => {
            let notes = resp.data.map(note => ({
                noteId: note.id,
                title: note.title,
                status: 1,
                select: false
            }))
            if (notes.length > 0) {
                notes[0].select = true
            }
            notebook.notes = notes
            notebook.status = 1
            let notebooks = getState().notebooks.map(n => ({...n}))
            dispatch({
                type: FETCH_NOTE_LIST,
                notebooks
            })
        })
    }
}

//笔记本已存在
export const NOTEBOOK_IS_EXISTS = 'NOTEBOOK_IS_EXISTS'
//新建一个笔记本
export const ADD_NOTEBOOK = 'ADD_NOTEBOOK'
export const addNotebook = name => {
    return function (dispatch, getState) {
        //先判断是否已经存在同名的笔记本
        const notebooks = getState().notebooks
        if (notebooks.some(notebook => notebook.name === name)) {
            //如果存在，则发出一个已存在的action
            dispatch({
                type: NOTEBOOK_IS_EXISTS,
                code: 400
            })
            setTimeout(() => {
                dispatch({
                    type: NOTEBOOK_IS_EXISTS,
                    code: 200
                }, 10)
            })
        } else {
            //关闭对话框
            dispatch(closeAddTag())
            axios.put('/api/notebook', {
                name: name
            }, {
                headers: {
                    Token: localStorage.getItem('token')
                }
            }).then(resp => {
                //发起一个添加笔记本的action
                dispatch({
                    type: ADD_NOTEBOOK,
                    name,
                    notebookId: resp.data.data
                })
            })
        }
    }
}

//初始化笔记本列表
export const INIT_NOTEBOOK_LIST = 'INIT_NOTEBOOK_LIST'
export const fetchNotebooks = () => {
    return function (dispatch) {
        axios.get('/api/notebook/list', {
            headers: {
                Token: localStorage.getItem('token')
            }
        }).then(resp => {
            let notebooks = resp.data.map(notebook => ({
                notebookId: notebook.id,
                name: notebook.name,
                status: 0,
                notes: [],
                select: false
            }))
            //选中一个笔记本
            if (notebooks.length > 0) {
                notebooks[0].select = true
            }
            dispatch({
                type: INIT_NOTEBOOK_LIST,
                notebooks
            })
            dispatch(fetchNotes())
        })
    }
}

// 删除笔记本
const DELETE_NOTEBOOK = 'DELETE_NOTEBOOK'
const deleteNotebook = () => {
    return (dispatch, getState) => {
        let notebooks = getState().notebooks
        // 获取当前笔记本
        let currentNotebook = notebooks.find(notebook => notebook.select)
        //删除笔记本
        dispatch({
            type: DELETE_NOTEBOOK
        })
        //选择其他的笔记本
        if (notebooks.length > 0) {
            dispatch(changeNotebook(notebooks[notebooks.length - 1].notebookId))
        }
        axios.delete('/api/notebook/' + currentNotebook.notebookId, {
            headers: {
                Token: localStorage.getItem('token')
            }
        })
    }
}

//更新笔记本的笔记列表
const UPDATE_NOTE_LIST = 'UPDATE_NOTE_LIST'
const updateNoteList = (notes, id) => ({
    type: UPDATE_NOTE_LIST,
    notes,
    //要更新的笔记本id
    id
})

//更改选择的笔记本
const CHANGE_NOTEBOOK = 'CHANGE_NOTEBOOK'
const changeNotebook = notebookId => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_NOTEBOOK,
            notebookId
        })
        dispatch(fetchNotes())
    }
}

export {
    DELETE_NOTEBOOK,
    deleteNotebook,
    UPDATE_NOTE_LIST,
    updateNoteList,
    CHANGE_NOTEBOOK,
    changeNotebook
}