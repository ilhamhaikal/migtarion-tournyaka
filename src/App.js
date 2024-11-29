import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Pages
import Login from "./pages/login";
// import Home from "./pages/Home";

// Import Global CSS
import "./assets/css/global.css";

function App() {
  return (
    <Router>
      <div>
        {/* Global Layout */}
        <Routes>
          {/* Route Definitions */}
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
