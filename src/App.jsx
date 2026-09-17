import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useState } from "react";

import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Video from "./pages/Video";
import Library from "./pages/Library";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((previous) => !previous);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <Nav toggleSidebar={toggleSidebar} />

        <div className="app__body">
          <Sidebar
            sidebarOpen={sidebarOpen}
            closeSidebar={closeSidebar}
          />

          {sidebarOpen && (
            <div
              className="sidebar-overlay"
              onClick={closeSidebar}
            />
          )}

          <main
            className={
              sidebarOpen
                ? "main"
                : "main main--expanded"
            }
          >
            <Switch>
              <Route
                path="/video/:id"
                component={Video}
              />

              <Route
                path="/search"
                component={Search}
              />

              <Route
                path="/library"
                component={Library}
              />

              <Route
                path="/"
                exact
                component={Home}
              />
            </Switch>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;