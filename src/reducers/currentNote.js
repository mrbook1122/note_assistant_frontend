import {CHANGE_NOTE} from "../actions/note";

const currentNote = (state = {}, action) => {
    switch (action.type) {
        case CHANGE_NOTE:
            return {
                id: action.id,
                noteTitle: action.noteTitle
            }
        default:
            return state;
    }
}

export default currentNote