import React from 'react';
import {Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import { createBrowserHistory } from 'history'
import Workouts from '../components/Workouts'
import Dashboard from '../components/Dashboard';

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <header>
            <div class="title_wrapper">
                <h1 className="title">Flex Deck</h1>
                <p className="subtitle">A Deck of Cards Workout</p>     
            </div>
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='workouts'>Build Workout</NavLink>
            </nav>
        </header>
        
        <div>
            <Switch>
                <Route
                    path="/"
                    component={Dashboard}
                    exact={true}
                />
                <Route 
                    path="/workouts"
                    component={Workouts}
                />
            </Switch>
        </div>
    </Router>
)

export default AppRouter;