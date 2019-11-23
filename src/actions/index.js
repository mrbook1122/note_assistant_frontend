import axios from 'axios'

import {CHANGE_NOTE, addNote} from "./note";

export const ADD_NOTEBOOK = 'ADD_NOTEBOOK'

export const ADD_NOTE = 'ADD_NOTE'

//删除笔记本
export const DELETE_NOTEBOOK = 'DELETE_NOTEBOOK'
export const deleteNotebook = id => {
    return (dispatch, getState) => {
        dispatch({
            type: DELETE_NOTEBOOK,
            id
        })
        console.log(getState().notebooks)
        //选择其他的笔记本
        let notebooks = getState().notebooks
        if (notebooks.length > 0) {
            dispatch(changeNotebook(notebooks[0].notebookName, notebooks[0].id))
        } else {
            //如果不剩下笔记本，则新建一个默认笔记本
        }
    }
}

export const DELETE_NOTE = 'DELETE_NOTE'

export const UPDATE_NOTE_LIST = 'UPDATE_NOTE_LIST'

//更新笔记本的笔记列表
export const updateNoteList = (notes, id) => ({
    type: UPDATE_NOTE_LIST,
    notes,
    //要更新的笔记本id
    id
})

//更改选择的笔记本     设计的不合理，更改选择的笔记本不需要笔记本名称
export const CHANGE_NOTEBOOK = 'CHANGE_NOTEBOOK'
export const changeNotebook = (name, id) => {
    return (dispatch, getState) => {
        let notebooks = getState().notebooks
        let currentNotebookId = getState().currentNotebook.id
        for (let i = 0; i < notebooks.length; i++) {
            //匹配的笔记本
            if (notebooks[i].id === id) {
                new Promise(resolve => {
                    //先判断是否已经获取过了笔记列表
                    if (!notebooks[i].init) {
                        axios.get('/note/list', {
                            params: {
                                id: id
                            },
                            headers: {
                                Token: localStorage.getItem('token')
                            }
                        }).then(resp => {
                            //如果没有获取过，则先更新笔记本列表中的数据
                            dispatch(updateNoteList(resp.data, id))
                            resolve({
                                notebookName: name,
                                id: id,
                                notes: resp.data
                            })
                        })
                    } else {
                        resolve({
                            notebookName: name,
                            id: id,
                            notes: notebooks[i].notes
                        })
                    }
                }).then(value => {
                    //1. 更改笔记本
                    dispatch({
                        type: CHANGE_NOTEBOOK,
                        ...value
                    })
                    return value
                }).then(value => {
                    //判断笔记本是否为空
                    if (value.notes.length === 0) {
                        //创建一个笔记
                        dispatch(addNote(''))
                    } else {
                        //如果还是当前笔记本，则不更改选择的笔记
                        if (currentNotebookId !== id)
                            dispatch({
                                type: CHANGE_NOTE,
                                id: value.notes[0].id,
                                noteTitle: value.notes[0].title
                            })
                    }
                })
            }
        }

    }
}

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
        axios.get('/notebook/list', {
            headers: {
                Token: localStorage.getItem('token')
            }
        })
            .then(resp => {
                let notebooks = resp.data.map(notebook => ({
                    id: notebook.id,
                    notebookName: notebook.name,
                    init: false,
                    notes: []
                }))
                dispatch({
                    type: INIT_NOTEBOOK_LIST,
                    notebooks: notebooks
                })
                return notebooks
            })
            .then(notebooks => {
                //默认选择第一个笔记本的第一条笔记
                if (notebooks.length > 0) {
                    dispatch(changeNotebook(notebooks[0].notebookName, notebooks[0].id))
                }
            })
    }
}

//新建一个笔记本
export const addNotebook = notebookName => {
    return function (dispatch, getState) {
        //先判断是否已经存在同名的笔记本
        const notebooks = getState().notebooks
        if (notebooks.some(notebook => notebook.notebookName === notebookName)) {
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
            axios.post('/notebook/add', {
                name: notebookName
            }, {
                headers: {
                    Token: localStorage.getItem('token')
                }
            }).then(resp => {
                //发起一个添加笔记本的action
                dispatch({
                    type: ADD_NOTEBOOK,
                    notebookName,
                    id: resp.data.id
                })
            })
        }
    }
}
