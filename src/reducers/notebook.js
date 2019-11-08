import {INIT_NOTEBOOK_LIST} from "../actions";

const notebooks = (state = [], action) => {
    switch (action.type) {
        case INIT_NOTEBOOK_LIST:
            return action.notebooks

        default:
            return state
    }
}

export default notebooks