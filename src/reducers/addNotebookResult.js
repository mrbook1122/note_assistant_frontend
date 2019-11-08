import {NOTEBOOK_IS_EXISTS} from "../actions";

const addNotebookResult = (state = {resultCode: 0}, action) => {
    switch (action.type) {
        case NOTEBOOK_IS_EXISTS:
            return {resultCode: 400}
        default:
            return state;
    }
}

export default addNotebookResult