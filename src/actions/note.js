import axios from 'axios'

import {changeNotebook} from "./index";

//新建一条笔记，state中只保存笔记的id和title
export const ADD_NOTE = 'ADD_NOTE'
export const addNote = () => {
    return (dispatch, getState) => {
        dispatch({
            type: ADD_NOTE
        })
        let notebook = getState().notebooks.find(notebook => notebook.select)
        //新建一条笔记
        axios.put('/api/note', {
            title: '',
            notebookId: notebook.notebookId
        }, {
            headers: {
                Token: localStorage.getItem('token')
            }
        }).then(resp => {
            if (resp.data.code === 200)
                dispatch(updateNoteTitle('', resp.data.data))
        })
    }
}


/**
 * 更新笔记的标题，
 * 如果传入id，则表明这篇笔记是新建的
 */
export const UPDATE_NOTE_TITLE = 'UPDATE_NOTE_TITLE'
export const updateNoteTitle = (title, noteId) => {
    return (dispatch, getState) => {
        let notebooks = getState().notebooks.map(notebook => {
            if (notebook.select) {
                let notes = notebook.notes.map(note => {
                    if (note.select) {
                        if (note.status === 0) {
                            return {noteId, title, status: 1, select: true}
                        }
                        return {...note, title}
                    }
                    return note
                })
                return {...notebook, notes}
            }
            return notebook
        })
        dispatch({
            type: UPDATE_NOTE_TITLE,
            notebooks
        })
    }
}