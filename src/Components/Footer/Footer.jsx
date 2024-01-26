import React from 'react';
import './Styles.css'; 

const Footer = () => {
  const year = new Date().getFullYear(); 

  return (
    <footer className="footer">
      <div className="container">
        <p className="copyright">&copy; {year} Text Summarizer. All rights reserved.</p>
        <ul className="footer-info">
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;