import {combineReducers} from "redux";

import showAddTag from "./showAddTag";
import notebooks from "./notebooks";
import addNotebookResult from "./addNotebookResult";

const reducer = combineReducers({
    showAddTag,
    notebooks,
    addNotebookResult
})

export default reducer