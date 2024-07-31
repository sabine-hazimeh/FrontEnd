import { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { CODE_SNIPPETS } from "../../constants.js";
import Output from "../Output/Output.jsx";
import "./CodeEditor.css";
import * as monaco from "monaco-editor";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("python");
  const [title, setTitle] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();

    editor.addAction({
      id: "apply-suggestion",
      label: "Apply Suggestion",
      keybindings: [monaco.KeyCode.Tab],
      run: () => applySuggestion(),
    });

    editor.onKeyDown((e) => {
      if (e.keyCode === monaco.KeyCode.Tab) {
        e.preventDefault();
        applySuggestion();
      } else {
        setShowHint(false);
      }
    });
  };

  const applySuggestion = () => {
    const editor = editorRef.current;
    if (!editor || !monaco) {
      return;
    }

    const suggestion = autocompleteSuggestions[0]; // Apply the first suggestion for simplicity

    if (suggestion) {
      const position = editor.getPosition();
      const range = new monaco.Range(
        position.lineNumber,
        position.column,
        position.lineNumber,
        position.column
      );

      editor.executeEdits("apply-suggestion", [
        {
          range: range,
          text: suggestion,
          forceMoveMarkers: true,
        },
      ]);

      setValue(editor.getValue());
      setAutocompleteSuggestions([]);
      setShowHint(false);
    }
  };

  const fetchAutocompleteSuggestions = async (code) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/autocomplete",
        {
          language,
          code,
        }
      );
      setAutocompleteSuggestions(
        response.data.choices[0].message.content.split("\n")
      );
      setShowHint(response.data.choices[0].message.content.length > 0);
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handle = setTimeout(() => {
      if (editorRef.current) {
        const code = editorRef.current.getValue();
        fetchAutocompleteSuggestions(code);
      }
    }, 1000);
    return () => clearTimeout(handle);
  }, [value, language]);

  const handleSaveButtonClick = () => {
    setShowInput(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const code = editorRef.current.getValue();
    console.log("Data to be sent:", { title, code });

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/code",
        { title, code }
      );
      console.log("Data sent successfully:", response.data);
      setShowInput(false);
      setTitle("");
      setValue("");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleDownload = () => {
    const code = editorRef.current.getValue();
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title || "code"}.${language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="custom-editor-container">
      <div className="editor-wrapper">
        <div className="language-selector">
          <div className="output-title">Language</div>
          <div className="button-container">
            <button
              onClick={handleSaveButtonClick}
              className="savecode-btn"
            >
              Save Code
            </button>
            <button onClick={handleDownload} className="download-btn">
              Download Code
            </button>
          </div>

          {showInput && (
            <div className="modal">
              <div className="modal-content">
                <form onSubmit={handleSubmit} className="save-form">
                  <input
                    className="modal-input"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                  />
                  <div className="modal-buttons">
                    <button type="submit" className="submit-btn">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setShowInput(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
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
        {isLoading && <div>Loading...</div>}
      </div>

      <Output editorRef={editorRef} language={language} />

      {showHint && autocompleteSuggestions.length > 0 && (
        <div className="autocomplete-suggestions">
          <ul>
            {autocompleteSuggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
