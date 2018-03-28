import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Home from '../components/Home';
import NavBar from '../components/Navbar';

import Campgrounds from '../dashboard/Campgrounds';
import AddCampground from '../dashboard/AddCampground';
import Campground from '../dashboard/Campground'
import User from '../dashboard/User';
import EditCampground from '../dashboard/EditCampground';

export const history = createHistory()

const AppRouter = () => (
    <div>
        <Router history={history}>
        <div>
            <NavBar />
            <Switch>
                <Route path='/' exact={true} component={(props) => <Home {...props} color='green'/>} />
                <Route path='/campgrounds' exact={true} component={(props) => <Campgrounds {...props} test='work' /> } />
                <Route path='/campgrounds/new' exact={true} component={AddCampground} />
                <Route path='/campgrounds/:id' exact={true} component={Campground} />
                <Route path='/campgrounds/:id/edit' component={EditCampground} />
                <Route path='/signin' component={(props) => <User {...props} headText='Sign In' buttonText='Sign In'/> } />
                <Route path='/signup' component={(props) => <User {...props} headText='Sign Up' buttonText='Sign Up'/> } />
            </Switch>
        </div>
        </Router>
    </div>
)

export default AppRouter;