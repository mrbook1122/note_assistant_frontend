export const ADD_NOTEBOOK = 'ADD_NOTEBOOK'

export const ADD_TAG = 'ADD_TAG'

export const ADD_NOTE = 'ADD_NOTE'

export const DELETE_NOTEBOOK = 'DELETE_NOTEBOOK'

export const DELETE_TAG = 'DELETE_TAG'

export const DELETE_NOTE = 'DELETE_NOTE'


export const addTag = text => {
    return dispatch => {
        new Promise((resolve, reject) => {
            let request = indexedDB.open('note', 1)

            request.onsuccess = e => {
                let db = e.target.result;
                let transaction = db.transaction('notes', 'readwrite')
                new Promise((resolve, reject) => {
                    let notebookOS = transaction.objectStore('notes')
                    let notebookRequest = notebookOS.get()
                    notebookRequest.onsuccess = (e) => {
                        let list = e.target.result;
                        // 读取数据库中的数据
                        resolve()
                    }
                })
            }
        })
    }
}

//展示添加标签对话框
export const SHOW_ADD_TAG = 'SHOW_ADD_TAG'
export const CLOSE_ADD_TAG = 'CLOSE_ADD_TAG'
export const showAddTag = () => ({
    type: SHOW_ADD_TAG
})
export const closeAddTag = () => ({
    type: CLOSE_ADD_TAG
})
