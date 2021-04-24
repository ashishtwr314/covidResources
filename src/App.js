import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { firebaseApp } from "./firebase";
import shortid from "shortid";
import { Card, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import Home from "./Home";
import PostResources from "./PostResources";
import NeedResources from "./NeedResources";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <Router>
      <Sidebar
        className="sidebar"
        as={Menu}
        animation="overlay"
        direction="right"
        icon="labeled"
        vertical
        visible={showSidebar}
        width="thin"
      >
        <div
          className="sidebar-toggle inside-sidebar"
          onClick={() => setShowSidebar(false)}
        >
          <Icon name="close" size="big" />
        </div>
        <Menu.Item as="a">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item as="a">
          <Link to="/postresources">Provide a resource information</Link>
        </Menu.Item>
        <Menu.Item as="a">
          <Link to="/needresources">Get a resource information</Link>
        </Menu.Item>
      </Sidebar>
      <Route exact path="/postresources">
        <PostResources setShowSidebar={setShowSidebar} />
      </Route>
      <Route exact path="/needresources">
        <NeedResources setShowSidebar={setShowSidebar} />
      </Route>
      <Route exact path="/">
        <Home setShowSidebar={setShowSidebar} />
      </Route>
    </Router>
  );
}

export default App;
