import {SHOW_ADD_TAG, CLOSE_ADD_TAG} from '../actions'

const reducer = (state, action) => {

    switch (action.type) {
        case SHOW_ADD_TAG:
            return Object.assign({}, state, {showAddTag: true})
        case CLOSE_ADD_TAG:
            return Object.assign({}, state, {showAddTag: false})
        default:
            return state
    }
}

export default reducer