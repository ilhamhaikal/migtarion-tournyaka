import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/loginpages/login";
import Register from "./pages/loginpages/register";
import ForgetPassword from "./pages/loginpages/forgetpassword";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/dashboard/dashboard";
import AddArticle from "./pages/dashboard/AddArticle";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/contact";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/article/ArticleDetail";
import "./assets/css/global.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="add-article" element={<AddArticle />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
