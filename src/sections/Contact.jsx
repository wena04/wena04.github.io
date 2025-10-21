import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <p>
              I'm always interested in new opportunities and exciting projects.
              Whether you have a question or just want to say hi, feel free to
              reach out!
            </p>
            <div className="contact-methods">
              <a href="mailto:wena04@uw.edu" className="contact-method">
                <span className="contact-icon">📧</span>
                <span>wena04@uw.edu</span>
              </a>
              <a
                href="https://linkedin.com/in/anthony-wen"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-method"
              >
                <span className="contact-icon">💼</span>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/wena04"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-method"
              >
                <span className="contact-icon">🐙</span>
                <span>GitHub</span>
              </a>
            </div>
          </div>
          <div className="contact-form">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
