import React from "react";
import logo from "../../assets/logo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-logo">
        <img src={logo} alt="" />
      </div>

      {/* copyright */}
      <div className="footer-copyright">
        <p>©️ 2024 I-Novotek Academy. All right reserverd.</p>
      </div>

      {/* social */}
      <ul className="footer-social-media">
        <li>
          <a href="/">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
        </li>
        <li>
          <a href="/">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </li>
        <li>
          <a href="/">
            <i className="fa-brands fa-youtube"></i>
          </a>
        </li>
        <li>
          <a href="/">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
