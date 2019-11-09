import {NOTEBOOK_IS_EXISTS} from "../actions";

const addNotebookResult = (state = {resultCode: 0}, action) => {
    switch (action.type) {
        case NOTEBOOK_IS_EXISTS:
            return {resultCode: action.code}
        default:
            return state;
    }
}

export default addNotebookResult