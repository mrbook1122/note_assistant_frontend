/*global chrome*/
import React, {useState, useEffect} from 'react'
import Editor from 'froala-editor'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/js/languages/zh_cn'
import 'froala-editor/js/plugins/image.min'
import 'froala-editor/js/plugins/align.min'
import 'froala-editor/js/plugins/url.min'
import 'froala-editor/js/plugins/video.min'
import 'froala-editor/js/plugins/char_counter.min'
import 'froala-editor/js/plugins/code_beautifier.min'
import 'froala-editor/js/plugins/code_view.min'
import 'froala-editor/js/plugins/colors.min'
import 'froala-editor/js/plugins/draggable.min'
import 'froala-editor/js/plugins/edit_in_popup.min'
import 'froala-editor/js/plugins/word_paste.min'
import 'froala-editor/js/plugins/special_characters.min'
import 'froala-editor/js/plugins/file.min'
import 'froala-editor/js/plugins/font_family.min'
import 'froala-editor/js/plugins/font_size.min'
import 'froala-editor/js/plugins/fullscreen.min'
import 'froala-editor/js/plugins/forms.min'
import 'froala-editor/js/plugins/paragraph_format.min'
import 'froala-editor/js/plugins/paragraph_style.min'
import 'froala-editor/js/plugins/help.min'
import 'froala-editor/js/plugins/line_breaker.min'
import 'froala-editor/js/plugins/link.min'
import 'froala-editor/js/plugins/line_height.min'
import 'froala-editor/js/plugins/print.min'
import styled from "styled-components";

const Container = styled.div`
    flex-grow: 1;
    margin: 0 10px 5px;
`

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('aaaa')
        console.log(sender.tab.url)
        sendResponse({})
    }
)

const EditorComponent = () => {
    const [editor, setEditor] = useState(null)

    useEffect(() => {
        if (!editor && document.getElementById('example')) {
            let editor = new Editor('#example', {
                language: 'zh_cn',
                toolbarButtons: [
                    ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting',
                        'alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote',
                        'insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR',
                        'undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help']
                ],
                placeholderText: '',
                events: {
                    'input': e => {
                        console.log(editor.html.get())
                    },
                    'drop': html => {
                        console.log('aaa')
                    }
                },
                heightMin: 450
            })
            setEditor(editor)
        }
    }, [editor])

    return (
        <Container>
            <div id={'example'}>

            </div>
        </Container>
    )
}

export default EditorComponent