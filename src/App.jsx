import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import "./styles/index.css";
import "./styles/App.css";
import "./styles/navbar.css";
import "./styles/hero.css";
import "./styles/sections.css";
import "./styles/footer.css";

function App() {
  return (
    <div className="app">
      {/* <Navbar /> */}
      <main className="main-content">
        <Hero />
        {/* <About /> */}
        {/* <Projects /> */}
        {/* <Contact /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
