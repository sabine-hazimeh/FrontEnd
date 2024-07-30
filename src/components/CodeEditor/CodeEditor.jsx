import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";

import { CODE_SNIPPETS } from "../../constants.js";
import Output from "../Output/Output.jsx";
import "./CodeEditor.css";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("python");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <div className="custom-editor-container">
      <div className="editor-wrapper">
        <div className="language-selector ">
          <div className="output-title">Language</div>
          <button className="lang-button">Python </button>
        </div>
        <Editor
          className="custom-editor"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
          }}
          theme="vs-dark"
          language={language}
          defaultValue={CODE_SNIPPETS[language]}
          onMount={onMount}
          value={value}
          onChange={(value) => setValue(value)}
        />
      </div>
      {/* <div className="output-container"> */}
      <Output editorRef={editorRef} language={language} />
      {/* </div> */}
    </div>
  );
};

export default CodeEditor;
