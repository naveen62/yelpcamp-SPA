import React from 'react';
import {connect} from 'react-redux';
import Hero from '../components/Hero';
import FormCampground from '../components/FormCampground';
import {addCampground} from '../actions/camps'

const AddCampground = (props) => (
    <div>
        <div className='container'>
            <Hero head='Add Campground' button={false} />
            <FormCampground onSubmit={(campground) => {
                props.dispatch(addCampground(campground));
                props.history.push('/campgrounds')
            }} />
        </div>
    </div>
)
export default connect()(AddCampground)