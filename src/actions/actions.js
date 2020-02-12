import axios from 'axios'

const CHANGE_NOTEBOOK_NAME = 'CHANGE_NOTEBOOK_NAME'
const changeNotebookName = newName => {
    return (dispatch, getState) => {
        dispatch({
            type: 'RENAME',
            rename: false
        })
        let repeated = false
        let notebookId
        let notebooks = getState().notebooks.map(n => {
            if (n.select) {
                notebookId = n.notebookId
                // 判断是否命名重复
                if (n.name === newName) {
                    repeated = true
                }
                return {...n, name: newName}
            } else return {...n}
        })
        if (repeated) return

        dispatch({
            type: CHANGE_NOTEBOOK_NAME,
            notebooks
        })

        let params = new URLSearchParams()
        params.append('name', newName)
        axios.post('/api/notebook/' + notebookId, params, {
            headers: {
                Token: localStorage.getItem('token')
            }
        })
    }
}

export {
    CHANGE_NOTEBOOK_NAME,
    changeNotebookName
}