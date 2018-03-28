import React from 'react';
import {connect} from 'react-redux';
import Hero from '../components/Hero';
import FormCampground from '../components/FormCampground';
import {editCampground} from '../actions/camps'

const EditCampground = (props) => (
    <div>
        <div className='container'>
            <Hero head='Edit Campground' button={false} />
            <FormCampground onSubmit={(id, campground) => {
                console.log('test edit');
                props.dispatch(editCampground(id, campground))
                props.history.push('/campgrounds')
            }} camp={props.camp} />
        </div>
    </div>
)
const mapsToState = (state, props) => {
    return {
        camp: state.camps.find((camp) => camp._id == props.match.params.id)
    }
}
export default connect(mapsToState)(EditCampground)