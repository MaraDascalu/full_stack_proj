import React from "react";
import w1 from "../../assets/w1.jpg";
import w2 from "../../assets/w2.jpg";
import w3 from "../../assets/w3.jpg";
import w4 from "../../assets/w4.jpg";
import w5 from "../../assets/w5.jpg";
import w6 from "../../assets/w6.jpg";
import "./Works.css";

const Works = () => {
  return (
    <div className="works-container" id="portfolio">
      <h1>My Work</h1>
      <div className="works-list-container">
        <div className="works-item">
          <img src={w1} alt="" />
        </div>

        <div className="works-item">
          <img src={w2} alt="" />
        </div>

        <div className="works-item">
          <img src={w3} alt="" />
        </div>

        <div className="works-item">
          <img src={w4} alt="" />
        </div>

        <div className="works-item">
          <img src={w5} alt="" />
        </div>

        <div className="works-item">
          <img src={w6} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Works;
