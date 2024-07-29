import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Header from "./pages/Header/Header.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@chakra-ui/react";
// import theme from "./theme.js";

// const root = ReactDOM.createRoot(<App />, document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Header />
//     <ChakraProvider theme={theme}>
//     <App />
//     </ChakraProvider>
//   </React.StrictMode>
// );


const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}