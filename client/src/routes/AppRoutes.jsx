import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthorsContainer } from "../views/AuthorsContainer";
import { MainScreen } from "../views/MainScreen";

export const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainScreen />
        </Route>
        <Route exact path="/new">
          <AuthorsContainer />
        </Route>
        <Route exact path="/edit/:id">
          <AuthorsContainer />
        </Route>
      </Switch>
    </Router>
  );
};
