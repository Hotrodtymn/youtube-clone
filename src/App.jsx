import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";

import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Video from "./pages/Video";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="App">
        <Nav toggleSidebar={toggleSidebar} />

        <div className="app__body">
          <Sidebar sidebarOpen={sidebarOpen} />

          <main
            className={
              sidebarOpen
                ? "main"
                : "main main--expanded"
            }
          >
            <Route
              path="/"
              exact
              component={Home}
            />

            <Route
              path="/search"
              component={Search}
            />

            <Route
              path="/video/:id"
              component={Video}
            />
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;