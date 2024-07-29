import { useState } from "react";
import { executeCode } from "../../api";
import "./Output.css";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode("python", sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      // toast({
      //   title: "An error occurred.",
      //   description: error.message || "Unable to run code",
      //   status: "error",
      //   duration: 6000,
      // });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="output-container">
      <div className="output-title">Output</div>

      <div className={`output-box ${isError ? "error" : ""}`}>
        {isError ? (
          <div className="error-message">{errorMessage}</div>
        ) : output ? (
          output.map((line, i) => (
            <div key={i} className="output-line">
              {line}
            </div>
          ))
        ) : (
          'Click "Run Code" to see the output here'
        )}
      </div>
      <button
        className={`output-button ${isLoading ? "loading" : ""}`}
        onClick={runCode}
      >
        {isLoading ? "Running..." : "Run Code"}
      </button>
    </div>
  );
};

export default Output;
