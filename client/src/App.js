import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LeagueInput from "./LeagueInput";
import Leagues from "./Leagues";

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={LeagueInput} />
          <Route path="/leagues" component={Leagues} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
