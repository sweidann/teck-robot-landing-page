// import { useState } from "react";
import "./App.css";
import Home from "./pages/index.jsx";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <Home />
    </LanguageProvider>
  );
}

export default App;
