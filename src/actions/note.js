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
                noteTitle
            })
            //更新当前选择笔记本的笔记列表，通过这种方式来更新笔记列表
            dispatch(changeNotebook(currentNotebook.notebookName, currentNotebook.id))
            //更改选择的笔记
                dispatch(changeNote(noteTitle, resp.data.id))
        })
    }
}

//更改当前选择的笔记
export const CHANGE_NOTE = 'CHANGE_NOTE'
export const changeNote = (noteTitle, id) => ({
    type: CHANGE_NOTE,
    noteTitle,
    id
})