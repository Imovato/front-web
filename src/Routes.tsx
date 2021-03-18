import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SearchProvider } from "./contexts/Search";

import Home from "./pages/Home";
import Login from "./pages/Login";
import { Logout } from "./pages/Logout";
import { ChangePw, Profile } from "./pages/Profile";
import Property from "./pages/Property";
import Signup from "./pages/Signup";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <SearchProvider>
          <Route path="/" exact component={Home} />
          <Route path="/session/new" component={Login} />
          <Route path="/signup/new" component={Signup} />
          <Route path="/property/:id" component={Property} />
          <Route path="/account/profile" component={Profile} />
          <Route path="/account/password" component={ChangePw} />
          <Route path="/session" component={Logout} />
        </SearchProvider>
      </Switch>
    </Router>
  );
}
