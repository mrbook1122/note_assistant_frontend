import {CHANGE_NOTEBOOK_NAME} from "../actions";

const rename = (state = false, action) => {
    switch (action.type) {
        case 'RENAME':
            return action.rename;
        case CHANGE_NOTEBOOK_NAME:
            return false
        default:
            return state;
    }
}

export default rename