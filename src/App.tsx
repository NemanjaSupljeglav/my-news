//React
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Pages
import Home from "./pages/home/index";
import Details from "./pages/details/index";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
