import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Property from "./pages/Property";
import Signup from "./pages/Signup";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/session/new" component={Login} />
        <Route path="/signup/new" component={Signup} />
        <Route path="/property/:id" component={Property} />
      </Switch>
    </Router>
  );
}
