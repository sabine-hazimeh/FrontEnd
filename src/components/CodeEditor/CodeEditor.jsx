// import { HStack, Box} from "@chakra-ui/react";
// import Editor from "@monaco-editor/react";
// import { useRef,useState } from "react";
// import LanguageSelector from '../LanguageSelector.jsx';
// import { CODE_SNIPPETS } from "../../constants.js";
// import Output from "../Output.jsx";
// import "./style.css"
// // import React, { useState } from "react";

// const CodeEditor = () => {
//   const editorRef = useRef();
//   const [value, setValue] = useState("");
//   const [language, setLanguage] = useState("javascript");

//   const onMount = (editor) => {
//     editorRef.current = editor;
//     editor.focus();
//   };

//   const onSelect = (language) => {
//     setLanguage(language);
//     setValue(CODE_SNIPPETS[language]);
//   };

//   return (
//     <Box>
//       <HStack >
//         <Box w="50%">
//           <LanguageSelector language={language} onSelect={onSelect} />
//           <Editor
//             options={{
//               minimap: {
//                 enabled: false,
//               },
//             }}
//             height="100vh"
//             theme="vs-light"
//             language={language}
//             defaultValue={CODE_SNIPPETS[language]}
//             onMount={onMount}
//             value={value}
//             onChange={(value) => setValue(value)}
//           />
//         </Box>
//         <Output editorRef={editorRef} language={language} />
//       </HStack>
//     </Box>
//   );
// };






// return (
//   <Box className="mainbox">
//     <HStack className="hstack" >
//       <Box className="editorbox">
//         <LanguageSelector language={language} onSelect={onSelect} />
//         <Editor
//           options={{
//             minimap: {
//               enabled: false,
//             },
//           }}
//           height="75vh"
//           padding= "0px"
//           theme="vs-light"
//           language={language}
//           defaultValue={CODE_SNIPPETS[language]}
//           onMount={onMount}
//           value={value}
//           onChange={(value) => setValue(value)}
//         />
//       </Box>
//       <Output editorRef={editorRef} language={language} />
//     </HStack>
//   </Box>
// );
// };



// import { HStack, Box } from "@chakra-ui/react";
// import Editor from "@monaco-editor/react";
// import { useRef, useState } from "react";
// import LanguageSelector from '../LanguageSelector.jsx';
// import { CODE_SNIPPETS } from "../../constants.js";
// import Output from "../Output.jsx";
// import "./style.css";


// const CodeEditor = () => {
//   const editorRef = useRef();
//   const [value, setValue] = useState("");
//   const [language, setLanguage] = useState("javascript");

//   const onMount = (editor) => {
//     editorRef.current = editor;
//     editor.focus();
//   };

//   const onSelect = (language) => {
//     setLanguage(language);
//     setValue(CODE_SNIPPETS[language]);
//   };

//   return (
//     <Box className="custom-editor-container">
//       <HStack>
//         <Box w="50%" className="box2">
//           <Box className="custom-language-selector">
//             <LanguageSelector language={language} onSelect={onSelect} />
//           </Box>
//           <Editor className="custom-editor"
//             options={{
//               minimap: {
//                 enabled: false,
//               },
//             }}
//             height="calc(100vh - 40px)" // Adjust height to fit layout
//             theme="vs-light"
//             language={language}
//             defaultValue={CODE_SNIPPETS[language]}
//             onMount={onMount}
//             value={value}
//             onChange={(value) => setValue(value)}
//           />
//         </Box>
//           <Box className="custom-output-container">
//           <Output editorRef={editorRef} language={language} />
//         </Box>
//       </HStack>
//     </Box>
//   );
// };





import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelector from '../LanguageSelector.jsx';
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
          <LanguageSelector language={language} onSelect={onSelect} className="lang-button" />
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

