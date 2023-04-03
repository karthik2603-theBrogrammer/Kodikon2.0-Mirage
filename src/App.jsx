import React, { useState, useEffect } from "react";
import "./App.css";
import Hero from "./components/Hero";
import EnterDetails from "./components/EnterDetails";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ERP from "./components/ERP";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <EnterDetails />
            </>
          }
        />
        <Route path="/erp" element={<ERP />} />
      </Routes>
    </Router>
  );
}

export default App;
