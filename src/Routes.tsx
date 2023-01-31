import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TelaComprarPropriedade from "./pages/Acquisition";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Logout } from "./pages/Logout";
import { ChangePw, Profile } from "./pages/Profile";
import Property from "./pages/Property";
import { NewProperty } from "./pages/Property/new";
import Signup from "./pages/Signup";
import UserProperty from "./pages/UserProperty";

export default function Routes() {

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if ((!('theme' in localStorage))) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/session/new" component={Login} />
        <Route path="/signup/new" component={Signup} />
        <Route path="/property/new" component={NewProperty} />
        <Route path="/property/user" component={UserProperty} />
        <Route path="/property/:id" component={Property} />
        <Route path="/account/profile" component={Profile} />
        <Route path="/account/password" component={ChangePw} />
        <Route path="/session" component={Logout} />
        <Route path="/acquisition/save/:id" component={TelaComprarPropriedade}/>
      </Switch>
    </Router>
  );
}
