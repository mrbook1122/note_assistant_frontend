import {combineReducers} from "redux";

import notebooks from "./notebooks";
import {status} from "./status";

const reducer = combineReducers({
    status,
    notebooks,
})

export default reducer