import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {logout} from '../actions/auth';
import {history} from '../routes/AppRouter';
import Cookies from 'js-cookie';

class Navbar extends React.Component {
  
  handleLogout = () => {
    axios.get('http://localhost:3000/api/user/logout', {
      headers: {'x-auth': `${this.props.auth.token}`}
    }).then((res) => {
      console.log(res.data);
      this.props.dispatch(logout());
      Cookies.remove('token');
      history.push('/signin');
    }).catch((err) => {
      console.log(err);
    })
  }
  render() {
    return (
      <div>
      <nav className='navbar fixed-top navbar-expand-lg navbar-light bg-light'>
        <Link className="navbar-brand" to='/campgrounds'>YelpCamp</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav">
      {this.props.auth.email ? (
        <div className='navs'>
        <li className="nav-item">
          <a onClick={this.handleLogout} className='nav-link'>Logout</a>
        </li>
        </div>
      ) : (
        <div className='navs'>
        <li className="nav-item">
          <Link className="nav-link" to='/signin'>Sign In</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/signup'>Sign Up</Link>
        </li>
        </div>
      )}
      </ul>
    </div>
      </nav>
    </div>
    )
  }
}
const mapsToState = (state) => {
  return {
    auth: state.auth
  }
}
export default connect(mapsToState)(Navbar);