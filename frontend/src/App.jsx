import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Signing from "./components/signingPage/signing";
import Signup from "./components/signingPage/Signup";

import Home from "./components/LandingPage/Home";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signin" element={<Signing />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
