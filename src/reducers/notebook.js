import {INIT_NOTEBOOK_LIST, ADD_NOTEBOOK, UPDATE_NOTE_LIST, ADD_NOTE} from "../actions";

const notebooks = (state = [], action) => {
    switch (action.type) {
        case INIT_NOTEBOOK_LIST:
            return action.notebooks
        case ADD_NOTEBOOK:
            return [...state, {id: 2, notebookName: action.notebookName}]
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
        default:
            return state
    }
}

export default notebooks