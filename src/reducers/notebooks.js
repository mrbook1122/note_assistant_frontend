import {INIT_NOTEBOOK_LIST, ADD_NOTEBOOK, UPDATE_NOTE_LIST, ADD_NOTE, DELETE_NOTEBOOK, CHANGE_NOTEBOOK, FETCH_NOTE_LIST, CHANGE_NOTE} from "../actions";
import {UPDATE_NOTE_TITLE} from "../actions/note";

const notebooks = (state = [], action) => {
    switch (action.type) {
        case INIT_NOTEBOOK_LIST:
            return action.notebooks
        case ADD_NOTEBOOK:
            let notebooks = state.map(notebook => ({...notebook, select: false}))
            let notes = [{title: '', status: 0, select: false}]
            return [...notebooks, {name: action.name, notebookId: action.notebookId, status: 1, select: true, notes}]
        //新建一条笔记
        case ADD_NOTE:
            return state.map(notebook => {
                if (notebook.select) {
                    let notes = notebook.notes.map(note => ({...note, select: false}))
                    notes.push({title: '', status: 0, select: true})
                    return {...notebook, notes}
                } else return notebook
            })
        case CHANGE_NOTE:
            return state.map(notebook => {
                if (notebook.select) {
                    let notes = notebook.notes.map(note => {
                        if (note.noteId === action.noteId)
                            return {...note, select: true}
                        return {...note, select: false}
                    })
                    return {...notebook, notes}
                }
                return notebook
            })
        //更新笔记标题
        case UPDATE_NOTE_TITLE:
            return action.notebooks
        //删除笔记本
        case DELETE_NOTEBOOK:
            return state.filter(notebook => !notebook.select)
        case CHANGE_NOTEBOOK:
            return state.map(notebook => {
                if (action.notebookId === notebook.notebookId) {
                    return {...notebook, select: true}
                }
                return {...notebook, select: false}
            })
        case FETCH_NOTE_LIST:
            return state.map(notebook => {
                if (notebook.select) {
                    let notes = action.notes.map(note => ({
                        noteId: note.id,
                        title: note.title,
                        status: 1,
                        select: false
                    }))
                    return {...notebook, status: 1, notes}
                }
                return notebook
            })
        default:
            return state
    }
}

export default notebooks