import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <h3>Anthony Wen</h3>
            <p>Computer Science & Informatics Student</p>
            <p>University of Washington</p>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h4>Navigation</h4>
              <ul>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#projects">Projects</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Connect</h4>
              <ul>
                <li>
                  <a href="mailto:wena04@uw.edu">Email</a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/anthony-wen"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/wena04"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Anthony Wen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

