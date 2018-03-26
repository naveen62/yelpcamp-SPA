import React from 'react';
import Hero from '../components/Hero'
import CampgroundList from '../components/CampgroundList'
import {setCampgrounds} from '../actions/camps'
import MDSpinner from 'react-md-spinner';
import {connect} from 'react-redux';
import axios from 'axios';

class Campgrounds extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isCampgrounds: false,
        }
    }
    componentDidMount() {
        if(!this.props.camps.length > 0) {
            axios.get('http://localhost:3000/api/campground')
                .then((res) => {
                    const data = res.data.campground
                    this.setState(() => {
                        this.props.dispatch(setCampgrounds(data));
                        return {
                            isCampgrounds: true,
                        }
                    }) 
                }).catch((err) => {
                    console.log(err)
                })
        } else {
            this.setState(() => ({
                isCampgrounds: true
            }))   
        }
    }
    render() {
        return (
            <div className='container'>
                <Hero head='Welcome to Yelpcamp' title='Get best campgrounds' button={true} />
                {
                    this.state.isCampgrounds ? <CampgroundList /> : (
                        <div className='md-loader'>
                            <MDSpinner size={70} />
                        </div>
                    )
                }
            </div>
        )
    }
}
const mapsToState = (state) => {
    return {
        camps: state.camps
    }
}

export default connect(mapsToState)(Campgrounds)