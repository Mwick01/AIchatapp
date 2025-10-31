import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import OpenRouter from "./pages/OpenRouter.jsx";
import GoogleTranslate from "./pages/GoogleTranslate.jsx";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path ="/" element={<Home/>}/>
          <Route path ="/openrouter" element={<OpenRouter/>}/>
          <Route path ="/googletranslater" element={<GoogleTranslate/>}/>
        </Routes>
      </Router>
    
    </>
  );
}
export default App