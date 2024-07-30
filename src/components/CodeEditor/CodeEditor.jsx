import { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { CODE_SNIPPETS } from "../../constants.js";
import Output from "../Output/Output.jsx";
import "./CodeEditor.css";
import axios from "axios";

const CodeEditor = () => {
  
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("python");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(''); 
  const [showInput, setShowInput] = useState(false);
  
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  
  const handleSaveButtonClick = () => {
    setShowInput(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const code = editorRef.current.getValue(); // Get the code from the editor
    
    console.log('Data to be sent:', { title, code });

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/code', { title, code });
      console.log('Data sent successfully:', response.data);
      setShowInput(false); // Hide the input field after submitting
      setTitle(''); // Clear the input field
      setValue(''); // Clear the editor
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="custom-editor-container">
      <div className="editor-wrapper">
        <div className="language-selector">
          <div className="output-title">Language</div>
          <button className="lang-button">Python</button>
          
          <button onClick={handleSaveButtonClick}>Save Code</button>

          {showInput && (
            <div className={`toaster ${showInput ? 'visible' : 'hidden'}`}>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          )}

          {loading ? (
            <div>Loading...</div>
          ) : Array.isArray(data) && data.length > 0 ? (
            data.map((item) => <div key={item.id}>{item.name}</div>)
          ) : (
            <div>No data available</div>
          )}
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
      <Output editorRef={editorRef} language={language} />
    </div>
  );
};

export default CodeEditor;