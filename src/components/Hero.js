import React from 'react';
import {Link} from 'react-router-dom';

const Hero = (props) => (
    <div className='hero'>
        <div className='jumbotron'>
            <h1 className='display-4'>{props.head}</h1>
            <p className='lead'>{props.title}</p>
            {
                props.button &&
                <Link to='/campgrounds/new'>
                <button className='btn btn-success'>Add Campground</button>
                </Link>
            }
        </div>
    </div>
)
export default Hero;