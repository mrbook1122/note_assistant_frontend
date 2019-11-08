import axios from 'axios'

export const ADD_NOTEBOOK = 'ADD_NOTEBOOK'

export const ADD_TAG = 'ADD_TAG'

export const ADD_NOTE = 'ADD_NOTE'

export const DELETE_NOTEBOOK = 'DELETE_NOTEBOOK'

export const DELETE_TAG = 'DELETE_TAG'

export const DELETE_NOTE = 'DELETE_NOTE'

//笔记本已存在
export const NOTEBOOK_IS_EXISTS = 'NOTEBOOK_IS_EXISTS'

//初始化笔记本列表
export const INIT_NOTEBOOK_LIST = 'INIT_NOTEBOOK_LIST'

//展示添加标签对话框
export const SHOW_ADD_TAG = 'SHOW_ADD_TAG'
export const CLOSE_ADD_TAG = 'CLOSE_ADD_TAG'
export const showAddTag = () => ({
    type: SHOW_ADD_TAG
})
export const closeAddTag = () => ({
    type: CLOSE_ADD_TAG
})

//获取笔记本列表
export const fetchNotebooks = () => {
    return function (dispatch) {
        return axios.get('/api/notebook/list')
            .then(resp => {
                let notebooks = resp.data.map(notebook => ({
                    id: notebook.id,
                    notebookName: notebook.name
                }))
                dispatch({
                    type: INIT_NOTEBOOK_LIST,
                    notebooks: notebooks
                })
            })
    }
}

//新建一个笔记本
export const addNotebook = notebookName => {

    return (dispatch, getState) => {
        //先判断是否已经存在同名的笔记本
        const notebooks = getState().notebooks
        if (notebooks.some(notebook => notebook.name === notebookName)) {
            //如果存在，则发出一个已存在的action
            dispatch({
                type: NOTEBOOK_IS_EXISTS
            })
        } else {

        }
    }
}
