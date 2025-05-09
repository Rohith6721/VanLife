import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/vans/Vans";
import VanDetail from "./pages/Vans/VanDetail";
import Layout from "./components/Layout";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostLayout from "./components/HostLayout";


import "./server";


function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="vans" element={<Vans />} />
              <Route path="vans/:id" element={<VanDetail />} />

              <Route path="host" element={<HostLayout />} >
                  <Route index element={<Dashboard />} />
                  <Route path="income" element={<Income />} />
                  <Route path="reviews" element={<Reviews />} />
              </Route>
            </Route>
          </Routes>
        </Router>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
