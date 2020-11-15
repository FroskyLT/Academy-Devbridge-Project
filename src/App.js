import React from "react";
import Layout from "components/mainLayout/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import "App.scss";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Layout />
      </Router>
    </div>
  );
};

export default App;
