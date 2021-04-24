import React from "react";
import { Card, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";

const extra = (
  <a>
    <Icon name="user" />
    16 Friends
  </a>
);
function Home({ setShowSidebar }) {
  return (
    <div className="homepage-flex">
      <div>
        <Link to="/postresources">
          <Card
            className="card"
            header="I am PROVIDING services"
            description="I am providing services. I have some covid resources supplies and want to help others, with that resources"
          />
        </Link>
      </div>
      <div>
        <Link to="/needresources">
          <Card
            className="card"
            header="I am in NEED of services"
            description="I am in urgent need of services, and want you guys to help me"
          />
        </Link>
      </div>

      <div className="sidebar-toggle" onClick={() => setShowSidebar(true)}>
        <Icon name="sidebar" size="big" />
      </div>
    </div>
  );
}

export default Home;
