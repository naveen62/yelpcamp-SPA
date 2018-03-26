import React from 'react';
import {Link} from 'react-router-dom';

const CampgroundListitems = ({name, image, price, _id}) => (
    <div className='col-sm-12 col-lg-4 columns'>
        <div className='card'>
            <img src={`${image}`} className='card-img-top' />
            <div className='card-body'>
                <h5 className='card-title'>{name}</h5>
                <Link to={`campground/${_id}`} className='btn btn-primary'>View Campground</Link>
            </div>
        </div>
    </div>
)
export default CampgroundListitems;