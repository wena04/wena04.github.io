import { Typewriter } from "react-simple-typewriter";
import "./App.css";

// import IconLink from "./components/IconLink";
// import Experiences from "./components/experiences/Experiences";
// import Education from "./components/Education";
import VerticalNav from "./components/VerticalNav";
// import Projects from "./components/projects/Projects";

// import portraitPic from "./assets/portrait.svg";
// import linkedin from "./assets/linkedin.svg";
// import github from "./assets/github.svg";
// import email from "./assets/email.svg";

function App() {
  return (
    <>
      <VerticalNav />

      <div className="main-content">
        <div className="introContainer" id="about">
          {/* <div className="sec1">
            <img
              src={portraitPic}
              className="portrait"
              alt="Amelia notion portrait pic"
            />
            <p className="name">Amelia (Xiang) Li</p>
            <p>CS + Info @ University of Washington</p>
            <div className="icons">
              <IconLink
                href="https://www.linkedin.com/in/amelial9/"
                src={linkedin}
                alt="LinkedIn link"
              />
              <IconLink
                href="https://github.com/amelial9"
                src={github}
                alt="GitHub link"
              />
              <IconLink
                href="mailto:amelial9@uw.edu"
                src={email}
                alt="Email link"
              />
            </div>
          </div> */}
          <br></br>
          <br></br>
          <div className="sec2">
            <h1>
              Anthony Wen <br></br>{" "}
              <span
                className="typing-span"
                style={{ color: "black", fontWeight: "bold" }}
              >
                <Typewriter
                  words={[
                    "Developer",
                    "CS + INFO student",
                    "Boba + Music lover",
                  ]}
                  loop
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>
            </h1>
            <p className="intro">
              <blockquote>Communication is key in life</blockquote>
              Undergraduate student at the University of Washington currently
              pursuing a double degree* in Computer Science and Informatics.
              Open to work! Currently: - Leetcoding & job searching - Planning
              to create a personal website - TA for Frontend and Server Side
              Development
            </p>
            <br></br>
            <i
              style={{
                fontSize: "15px",
                color: "#473C35",
                display: "block",
                textAlign: "left",
                marginLeft: "30px",
              }}
            >
              ⚙️ Full-Stack Dev • 🧠 Product Thinking • 🧋 Boba Dev Hours
            </i>
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>

        {/* <section id="experiences">
          <Experiences />
        </section> */}

        <br></br>
        <br></br>
        <br></br>

        {/* <section id="projects">
          <Projects />
        </section> */}

        <br></br>

        {/* <section id="education">
          <Education />
        </section> */}

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <footer
          style={{
            textAlign: "center",
            padding: "10px",
            fontSize: "14px",
            color: "#473C35",
          }}
        >
          <p>© 2025 Anthony Wen</p>
        </footer>
      </div>
    </>
  );
}

export default App;
