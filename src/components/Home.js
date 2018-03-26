import React from 'react';
import {Link} from 'react-router-dom'

const Home = (props) => (
  <div className='home'>
      <Link to='/campgrounds'><button className='btn btn-success btn-lg'>View campground</button></Link>
  </div>
)

export default Home;