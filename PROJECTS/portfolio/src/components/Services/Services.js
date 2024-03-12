import React from "react";
import "./Services.css";

const Services = () => {
  return (
    <div className="services-container" id="services">
      <div className="services-list-container">
        {/* Descriptio */}
        <div className="services-description-container">
          <h1>
            My Awesome <span>Services</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            rhoncus tortor mauris. Nulla iaculis nisi at arcu lobortis lobortis.
            Mauris lobortis sapien lacinia elementum tempus. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Maecenas egestas, metus porttitor aliquet efficitur, ligula lorem
            laoreet libero, eu tristique orci nunc bibendum tortor. Suspendisse
            eget imperdiet libero. Etiam sed pellentesque lorem. Suspendisse
            elementum orci neque, ac lobortis justo dapibus sed.
          </p>
          <button>Hire ME!</button>
        </div>

        {/* items */}
        <div className="service-item-container">
          <div className="services-item">
            <i className="fa-solid fa-code"></i>
            <div className="item-description">
              <h3>Web Development</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                rhoncus tortor mauris. Nulla iaculis nisi at arcu lobortis
                lobortis. Mauris lobortis sapien lacinia elementum tempus. Orci
                varius natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.
              </p>
            </div>
          </div>

          <div className="services-item">
            <i className="fa-solid fa-desktop"></i>
            <div className="item-description">
              <h3>Desktop Development</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                rhoncus tortor mauris. Nulla iaculis nisi at arcu lobortis
                lobortis. Mauris lobortis sapien lacinia elementum tempus. Orci
                varius natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.
              </p>
            </div>
          </div>

          <div className="services-item">
            <i className="fa-solid fa-tablet-alt"></i>
            <div className="item-description">
              <h3>UX Design</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                rhoncus tortor mauris. Nulla iaculis nisi at arcu lobortis
                lobortis. Mauris lobortis sapien lacinia elementum tempus. Orci
                varius natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
