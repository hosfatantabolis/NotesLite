import ReactQuill from 'react-quill';
import React, { useState } from "react";
import 'react-quill/dist/quill.snow.css';
import "./Editor.css"
function Editor() {
    const [value, setValue] = useState('');
    return (
        <ReactQuill theme="snow" value={value} onChange={setValue} className="editor" />
    );
}
export default Editor;