import {combineReducers} from "redux";

import showAddTag from "./showAddTag";
import notebooks from "./notebooks";
import addNotebookResult from "./addNotebookResult";
import rename from "./rename";

const reducer = combineReducers({
    showAddTag,
    notebooks,
    addNotebookResult,
    rename
})

export default reducer