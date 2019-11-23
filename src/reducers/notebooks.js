import {INIT_NOTEBOOK_LIST, ADD_NOTEBOOK, UPDATE_NOTE_LIST, ADD_NOTE, DELETE_NOTEBOOK} from "../actions";
import {UPDATE_NOTE_TITLE} from "../actions/note";

const notebooks = (state = [], action) => {
    switch (action.type) {
        case INIT_NOTEBOOK_LIST:
            return action.notebooks
        case ADD_NOTEBOOK:
            return [...state, {id: action.id, notebookName: action.notebookName}]
        //初始化一个笔记本的笔记列表
        case UPDATE_NOTE_LIST:
            return state.map(notebook => {
                if (notebook.id === action.id) {
                    return {...notebook, init: true, notes: action.notes}
                } else return notebook
            })
        //新建一条笔记
        case ADD_NOTE:
            return state.map(notebook => {
                if (notebook.id === action.notebookID) {
                    return {...notebook, notes: [...notebook.notes, {id: action.noteID, title: action.noteTitle}]}
                } else return notebook
            })
        //更新笔记标题
        case UPDATE_NOTE_TITLE:
            return state.map(notebook => {
                if (notebook.id === action.notebookId) {
                    let notes = notebook.notes.map(note => {
                        if (note.id === action.noteId) {
                            return {
                                id: note.id,
                                title: action.noteTitle
                            }
                        } else return note;
                    })
                    return {...notebook, notes: notes}
                } else return notebook
            })
        //删除笔记本
        case DELETE_NOTEBOOK:
            return state.filter(notebook => notebook.id !== action.id)
        default:
            return state
    }
}

export default notebooks