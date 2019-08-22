import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import BraftEditor from "braft-editor";
import 'braft-editor/dist/index.css'

const App = () => {
    const [editor, setEditor] = useState(BraftEditor.createEditorState())

    const contentChange = editorState => {
        console.log(editorState.toRAW())
        setEditor(editorState)
    }

    return (
        <BraftEditor value={editor}
                     onChange={contentChange}/>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)