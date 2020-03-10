import {CHANGE_NOTEBOOK_NAME, CLOSE_ADD_TAG, SHOW_ADD_TAG, CHANGE_SIDER_STATUS} from "../actions";

let initialStatus = {
    sider: 'open',
    rename: false,
    addNotebookDialog: 'close',
}

const status = (state = initialStatus, action) => {
    switch (action.type) {

        // 新建笔记本的对话框
        case SHOW_ADD_TAG:
            return {...state, addNotebookDialog: 'open'}
        case CLOSE_ADD_TAG:
            return {...state, addNotebookDialog: 'close'}

        // 重命名笔记本
        case 'RENAME':
            return {...state, rename: action.rename};
        case CHANGE_NOTEBOOK_NAME:
            return {...state, rename: false};

        // 侧边栏
        case CHANGE_SIDER_STATUS:
            return {...state, sider: action.siderStatus}

        default:
            return state
    }
}

export {
    status
}