import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import {SwapiServiceProvider} from '../swapi-service-context';
import './app.css';

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import ProtectedApp from "../ProtectedApp/ProtectedApp";

export default class App extends Component {

    state = {
        swapiService: new SwapiService(),
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        });
    };

    onServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;
            return {
                swapiService: new Service()
            };
        });
    };

    render() {

        const {isLoggedIn} = this.state;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>
                        <div className="stardb-app">
                            <Header onServiceChange={this.onServiceChange}/>
                            <RandomPlanet/>

                            <Switch>

                                <Route path="/"
                                       render={() => <h2>Welcome to StarDB</h2>}
                                       exact/>

                                <Route path={['/people/', '/planets/', '/starships/', '/login', '/secret]']}
                                       render={({match}) => <ProtectedApp path={match.url} isLoggedIn={this.state.isLoggedIn}/>}/>
                                <Route render={() => <h2>Page not found</h2>}/>
                            </Switch>

                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
