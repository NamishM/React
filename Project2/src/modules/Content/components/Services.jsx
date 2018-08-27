import React from 'react';

const Services = () => (
  <div
    className="services"
    id="services"
  >
    <div className="services-content">
      <h3>Here is a list of things I can do:</h3>
      <ul className="list-things">
        <li><span className="big-font">WEB DESIGN</span>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut.</p>
        </li>
        <li><span className="big-font">WEB DEVELOPMENT</span>
          <p>Sed ut perspiciatis unde omnis iste natus error sit
            voluptatem accusantium.</p>
        </li>
      </ul>
      <p className="project-desc" style={{ marginTop: '100px' }}>
        Here is the link of few projects in React I did, have a look...
      </p>
      <p>(Design under progress......)</p>
    </div>
  </div>
);

export default Services;
