import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Pages
import Login from "./pages/login";
import Homepage from "./pages/Homepage"; // Tambahkan Homepage

// Import Global CSS
import "./assets/css/global.css";

function App() {
  return (
    <Router>
      <div>
        {/* Global Layout */}
        <Routes>
          {/* Route Definitions */}
          <Route path="/" element={<Homepage />} /> {/* Homepage Route */}
          <Route path="/login" element={<Login />} />
          {/* Tambahkan rute lainnya jika diperlukan */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
