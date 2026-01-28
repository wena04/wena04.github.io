import React from "react";
import "../styles/footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {currentYear} Anthony Wen</p>
    </footer>
  );
}

