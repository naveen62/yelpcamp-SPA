import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from '../components/Home';
import NavBar from '../components/Navbar';

import Campgrounds from '../dashboard/Campgrounds';
import AddCampground from '../dashboard/AddCampground';

const AppRouter = () => (
    <div>
        <BrowserRouter>
        <div>
            <NavBar />
            <Switch>
                <Route path='/' exact={true} component={(props) => <Home {...props} color='green'/>} />
                <Route path='/campgrounds' exact={true} component={(props) => <Campgrounds {...props} test='work' /> } />
                <Route path='/campgrounds/new' component={AddCampground} />
            </Switch>
        </div>
        </BrowserRouter>
    </div>
)

export default AppRouter;