import {combineReducers} from "redux";

import showAddTag from "./showAddTag";
import notebooks from "./notebook";
import addNotebookResult from "./addNotebookResult";
import currentNotebook from "./currentNotebook";

const reducer = combineReducers({
    showAddTag,
    currentNotebook,
    notebooks,
    addNotebookResult
})

export default reducer