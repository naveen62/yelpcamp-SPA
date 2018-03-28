import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Cookies from 'js-cookie';
import axios from 'axios';
import {connect} from 'react-redux'
import MDSpinner from 'react-md-spinner';

import Home from '../components/Home';
import NavBar from '../components/Navbar';
import {addUser} from '../actions/auth'

import Campgrounds from '../dashboard/Campgrounds';
import AddCampground from '../dashboard/AddCampground';
import Campground from '../dashboard/Campground'
import User from '../dashboard/User';
import EditCampground from '../dashboard/EditCampground';

export const history = createHistory()

class AppRouter extends React.Component {
        state = {
            visit: false
        }
    componentWillMount(){
        const token = Cookies.get('token');
        if(token) {
        axios.get('http://localhost:3000/api/user/token/me', {
            headers: {'x-auth': token}
        }).then((res) => {
            this.props.dispatch(addUser(res.data.user, token))
            this.setState(() => ({
                visit: true
            }))
        }).catch((err) => {

        })
      } else {
          this.setState(() => ({
              visit: true
          }))
      }
    }

    render() {
        return (
            <div>
                {
                    this.state.visit ? (
                        <div>
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
                        </div>
                    ) : (
                        <div className='page-loader'>
                            <MDSpinner size={100} />
                        </div>
                    )
                }
            </div>
        )
    }
}

export default connect()(AppRouter);