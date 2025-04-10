import "./App.css";
import Home from "./pages/index.jsx";
import { LanguageProvider } from "./context/LanguageContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <LanguageProvider>
      <Home />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "var(--primary-color)",
            color: "white",
            borderRadius: "8px",
            padding: "12px 20px",
            border: "1px solid white",
          },
        }}
      />
    </LanguageProvider>
  );
}

export default App;
