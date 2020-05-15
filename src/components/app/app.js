import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorBoundry from "../error-boundry";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import { SwapiServiceProvider } from "../swapi-service-context";
import "./app.css";
import { GoogleLogout } from "react-google-login";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedApp from "../ProtectedApp/ProtectedApp";

export default class App extends Component {
  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = (match, history) => {
    this.setState({
      isLoggedIn: true
    });
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      };
    });
  };

  onLogoutSuccess = history => {
    this.setState({
      isLoggedIn: false
    });
    history.push("/login");
  };

  render() {
    const { isLoggedIn } = this.state;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />
              <RandomPlanet />

              <Switch>
                <Route
                  path="/"
                  render={({ history }) => (
                    <div>
                      <h2>Welcome to StarDB</h2>
                      {isLoggedIn && (
                        <div>
                          <div className="stardb-app_login">
                            Now droids have opened a secret page for you!
                          </div>
                          <GoogleLogout
                            clientId="1068607023062-vnk0l7t2d891cbi5ho4qnoumb7fbdj1m.apps.googleusercontent.com"
                            buttonText="Logout"
                            onLogoutSuccess={() =>
                              this.onLogoutSuccess(history)
                            }
                          />
                        </div>
                      )}
                    </div>
                  )}
                  exact
                />

                <Route
                  path={[
                    "/people/",
                    "/planets/",
                    "/starships/",
                    "/login",
                    "/secret"
                  ]}
                  render={({ match, history }) => (
                    <ProtectedApp
                      path={match.url}
                      isLoggedIn={isLoggedIn}
                      onLogin={() => this.onLogin(history)}
                    />
                  )}
                />
                <Route render={() => <h2>Page not found</h2>} />
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
