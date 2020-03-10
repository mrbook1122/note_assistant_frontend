import axios from 'axios'

//展示添加标签对话框
export const SHOW_ADD_TAG = 'SHOW_ADD_TAG'
export const CLOSE_ADD_TAG = 'CLOSE_ADD_TAG'
export const showAddTag = () => ({
    type: SHOW_ADD_TAG
})
export const closeAddTag = () => ({
    type: CLOSE_ADD_TAG
})