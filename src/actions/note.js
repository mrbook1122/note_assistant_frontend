import axios from 'axios'

import {changeNotebook} from "./index";

//新建一条笔记，state中只保存笔记的id和title
export const ADD_NOTE = 'ADD_NOTE'
export const addNote = () => ({
    type: ADD_NOTE
})



//更新笔记的标题，首页需要更新notebooks中，然后更新选择的笔记本，然后更新当前笔记本
export const UPDATE_NOTE_TITLE = 'UPDATE_NOTE_TITLE'
export const updateNoteTitle = (noteId, noteTitle) => {
    return (dispatch, getState) => {
        // let notebookId = getState().currentNotebook.id
        // let notebookName = getState().currentNotebook.notebookName
        // //更新notebooks
        // dispatch({
        //     type: UPDATE_NOTE_TITLE,
        //     notebookId,
        //     noteId,
        //     noteTitle
        // })
        // //更新选择的笔记本
        // dispatch(changeNotebook(notebookName, notebookId))
        // //更新当前的笔记
        // dispatch(changeNote(noteTitle, noteId))
        // axios.post('/note/update', {
        //     id: noteId,
        //     title: noteTitle
        // }, {
        //     headers: {
        //         Token: localStorage.getItem('token')
        //     }
        // })
    }
}