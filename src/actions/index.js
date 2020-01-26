
import axios from 'axios'

import {addNote} from "./note";

export const ADD_NOTEBOOK = 'ADD_NOTEBOOK'

export const ADD_NOTE = 'ADD_NOTE'

//删除笔记本
export const DELETE_NOTEBOOK = 'DELETE_NOTEBOOK'
export const deleteNotebook = () => {
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

export const UPDATE_NOTE_LIST = 'UPDATE_NOTE_LIST'

//更新笔记本的笔记列表
export const updateNoteList = (notes, id) => ({
    type: UPDATE_NOTE_LIST,
    notes,
    //要更新的笔记本id
    id
})

//更改选择的笔记本
export const CHANGE_NOTEBOOK = 'CHANGE_NOTEBOOK'
export const changeNotebook = notebookId => ({
    type: CHANGE_NOTEBOOK,
    notebookId
})

//笔记本已存在
export const NOTEBOOK_IS_EXISTS = 'NOTEBOOK_IS_EXISTS'

//初始化笔记本列表
export const INIT_NOTEBOOK_LIST = 'INIT_NOTEBOOK_LIST'

//展示添加标签对话框
export const SHOW_ADD_TAG = 'SHOW_ADD_TAG'
export const CLOSE_ADD_TAG = 'CLOSE_ADD_TAG'
export const showAddTag = () => ({
    type: SHOW_ADD_TAG
})
export const closeAddTag = () => ({
    type: CLOSE_ADD_TAG
})

//获取笔记本列表
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
            dispatch({
                type: INIT_NOTEBOOK_LIST,
                notebooks
            })
            //选中一个笔记本
            if (notebooks.length > 0) {
                dispatch(changeNotebook(notebooks[0].notebookId))
            }
        })
    }
}

//更改当前选择的笔记
export const CHANGE_NOTE = 'CHANGE_NOTE'
export const changeNote = noteId => ({
    type: CHANGE_NOTE,
    noteId
})

/**
 * 初始化笔记本的笔记列表
 */
export const FETCH_NOTE_LIST = 'FETCH_NOTE_LIST'
export const fetchNotes = () => {
    return function (dispatch, getState) {
        //当前的笔记本
        let notebook = getState().notebooks.find(notebook => notebook.select)
        axios.get('/api/notebook/' + notebook.notebookId + '/note/list', {
            headers: {
                Token: localStorage.getItem('token')
            }
        }).then(resp => {
            dispatch({
                type: FETCH_NOTE_LIST,
                notes: resp.data
            })
            //选中一条笔记
            if (resp.data.length > 0) {
                dispatch(changeNote(resp.data[0].id))
            } else {
                //如果笔记本为空，则新建一条笔记
                dispatch(addNote())
            }
        })
    }
}

//新建一个笔记本
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
