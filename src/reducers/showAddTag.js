import {SHOW_ADD_TAG, CLOSE_ADD_TAG} from '../actions'

//是否显示添加笔记本的界面
const showAddTag = (state = false, action) => {
    console.log(state)
    switch (action.type) {
        case SHOW_ADD_TAG:
            return true
        case CLOSE_ADD_TAG:
            return false
        default:
            return state
    }
}

export default showAddTag

