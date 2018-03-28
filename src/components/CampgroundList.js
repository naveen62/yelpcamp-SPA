import React from 'react';
import {connect} from 'react-redux';
import CampgroundListitems from './CampgroundListitems'

const CampgroundList = (props) => (
    <div>
        <div className='row'>
            {
                props.camps.length == 0 ? <h1>No Campgrounds</h1> : 
                props.camps.map((camp) => <CampgroundListitems key={camp._id} {...camp} />)
            }
        </div>
    </div>
)
const mapsToState = (state) => {
    return {
        camps: state.camps
    }
}
export default connect(mapsToState)(CampgroundList)