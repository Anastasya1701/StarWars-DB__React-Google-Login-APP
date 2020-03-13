import React from 'react'
import {Route, Switch} from "react-router-dom";
import {LoginPage, PeoplePage, PlanetsPage, SecretPage, StarshipsPage} from "../pages";
import StarshipDetails from "../sw-components/starship-details";


const ProtectedApp = ({isLoggedIn}) => {
    return (
        <Switch>

            <Route path="/people/:id?" component={PeoplePage}/>
            <Route path="/planets/" component={PlanetsPage}/>
            <Route path="/starships/" exact component={StarshipsPage}/>
            <Route path="/starships/:id"
                   render={({match}) => {
                       const {id} = match.params;
                       return <StarshipDetails itemId={id}/>
                   }}/>
            <Route
                path="/login"
                render={() => (
                    <LoginPage
                        isLoggedIn={isLoggedIn}
                        onLogin={this.onLogin}/>
                )}/>

            <Route
                path="/secret"
                render={() => (
                    <SecretPage isLoggedIn={isLoggedIn}/>
                )}/>

        </Switch>
    )
}

export default ProtectedApp