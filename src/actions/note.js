import axios from 'axios'

import {changeNotebook} from "./index";

//新建一条笔记，state中只保存笔记的id和title
export const ADD_NOTE = 'ADD_NOTE'
export const addNote = (noteTitle) => {
    return (dispatch, getState) => {
        const currentNotebook = getState().currentNotebook
        axios.post('/api/note/add', {
            title: noteTitle,
            content: '',
            notebookID: currentNotebook.id
        }).then(resp => {
            //更新笔记本的笔记列表
            dispatch({
                type: ADD_NOTE,
                notebookID: currentNotebook.id,
                noteID: resp.data.id,
                noteTitle: resp.data.title
            })
            //更新当前选择笔记本的笔记列表
            dispatch(changeNotebook(currentNotebook.notebookName, currentNotebook.id))
            //更改选择的笔记

        })
    }
}