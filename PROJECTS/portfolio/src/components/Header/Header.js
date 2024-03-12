import React from "react";
import Typical from "react-typical";
import profileImg from "../../assets/profile.png";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-contaier" id="about">
      {/* header content */}
      <div className="header-content">
        <h1>Hi! I am</h1>
        <h2 className="fullname">Mara Dascalu</h2>
        <h2>
          I'm a {""}
          <Typical
            steps={[
              "Full Stack Developer (beginer) 🚀",
              1000,
              "Computer Science Graduate 💻",
              1000,
              "QA Engineer ✅",
              1000,
            ]}
            loop={Infinity}
            wrapper="b"
          />
        </h2>
        <p>
          Donec tempor metus ac tincidunt suscipit. Fusce imperdiet in nunc ac
          ornare. Integer hendrerit luctus odio ac pellentesque. Quisque
          sagittis ut dui molestie euismod. Maecenas vitae nisi pulvinar,
          fringilla nisi at, vulputate eros. Sed posuere augue vitae placerat
          fermentum. Donec congue, dui molestie egestas mattis, dolor lectus
          tempus urna, vel consectetur purus tellus sed mauris.
        </p>
      </div>

      {/* image container */}
      <div className="profile-image-container">
        <img src={profileImg} alt="" />
        <div className="circle-1"></div>
        <div className="circle-2"></div>
      </div>
    </div>
  );
};

export default Header;
