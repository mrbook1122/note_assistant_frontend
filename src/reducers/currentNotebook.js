import {CHANGE_NOTEBOOK} from "../actions";

const currentNotebook = (state = {}, action) => {
    if (action.type === CHANGE_NOTEBOOK)
        return {
            notebookName: action.notebookName,
            id: action.id,
            notes: action.notes
        }
    else return state
}

export default currentNotebook