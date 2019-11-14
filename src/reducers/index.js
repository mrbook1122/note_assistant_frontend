import {combineReducers} from "redux";

import showAddTag from "./showAddTag";
import notebooks from "./notebook";
import addNotebookResult from "./addNotebookResult";
import currentNotebook from "./currentNotebook";
import currentNote from "./currentNote";

const reducer = combineReducers({
    showAddTag,
    currentNotebook,
    notebooks,
    addNotebookResult,
    currentNote
})

export default reducer