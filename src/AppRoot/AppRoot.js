import React from 'react';
import { Route, Switch } from "react-router-dom";
import UserDetailsContainer from '../containers/UserDetailsContainer/UserDetailsContainer';
import UserListContainer from '../containers/UserListContainer/UserListContainer';

const AppRoot = props => {
    return (
        <div className="app">
            <Switch>
                <Route exact path="/" component={UserListContainer} />
                <Route exact path="/view/user/:userId" component={UserDetailsContainer} />
            </Switch>
        </div>
    )
}

export default AppRoot;