import React from 'react';
import Cardimage from '../components/Cardimage';
import {removeCampground} from '../actions/camps'
import {connect} from 'react-redux'
import axios from 'axios';

class Campground extends React.Component {
    state = {
        camp: false
    }
    componentWillMount() {
        if(!this.props.camp) {
            axios.get(`http://localhost:3000/api/campground/${this.props.match.params.id}`)
                .then((res) => {
                    this.setState(() => ({
                        camp: res.data.campground
                    }))
                })
        }
    }
    submit = (id) => {
        console.log('remove submit')
        this.props.dispatch(removeCampground(id))
        this.props.history.push('/campgrounds')
    }
    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-8 col-sm-8 columns-id'>
                            {
                                this.state.camp ? <Cardimage Onclick={this.submit} {...this.state.camp}/> : 
                                <Cardimage Onclick={this.submit} {...this.props.camp}/>
                            }
                        </div>  
                    </div>
                </div>
            </div>
        )
    }
}

const mapsToState = (state, props) => {
    return {
        camp: state.camps.find((camp) => camp._id == props.match.params.id)
    }
}
export default connect(mapsToState)(Campground)