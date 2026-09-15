import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Video from "./pages/Video";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />

        <div className="app__body">
          <Sidebar />

          <main className="main">
            <Route path="/" exact component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/video/:id" component={Video} />
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
