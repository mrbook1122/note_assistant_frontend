
import axios from 'axios'

import {addNote} from "./note";
export * from './actions'

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
export const changeNotebook = notebookId => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_NOTEBOOK,
            notebookId
        })
        dispatch(fetchNotes())
    }
}

//笔记本已存在
export const NOTEBOOK_IS_EXISTS = 'NOTEBOOK_IS_EXISTS'

//展示添加标签对话框
export const SHOW_ADD_TAG = 'SHOW_ADD_TAG'
export const CLOSE_ADD_TAG = 'CLOSE_ADD_TAG'
export const showAddTag = () => ({
    type: SHOW_ADD_TAG
})
export const closeAddTag = () => ({
    type: CLOSE_ADD_TAG
})

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
