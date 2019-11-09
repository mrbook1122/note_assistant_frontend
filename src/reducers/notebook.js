import {INIT_NOTEBOOK_LIST, ADD_NOTEBOOK, UPDATE_NOTE_LIST} from "../actions";

const notebooks = (state = [], action) => {
    switch (action.type) {
        case INIT_NOTEBOOK_LIST:
            return action.notebooks
        case ADD_NOTEBOOK:
            return [...state, {id: 2, notebookName: action.notebookName}]
        case UPDATE_NOTE_LIST:
            return state.map(notebook => {
                if (notebook.id === action.id) {
                    return {...notebook, init: true, notes: action.notes}
                } else return notebook
            })
        default:
            return state
    }
}

export default notebooks