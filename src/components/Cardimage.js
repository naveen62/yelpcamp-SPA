import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Cardimage extends React.Component {
    
    handleDel = () => {
        axios.delete(`http://localhost:3000/api/campground/${this.props._id}`, {
            headers: {'x-auth': `${this.props.auth.token}`}
        }).then((res) => {
            this.props.Onclick(this.props._id)
        })
    }
    render () {
        return (
            <div className='card'>
            {
                this.props.image && <img src={`${this.props.image.img}`} className='card-img-top' />
            }
            <div className='card-body'>
                <h5 className='body-title'>{this.props.name}</h5>
                <h5 className='float-right position-relative' style={{zIndex: '1', top: '-30px'}}>
                {this.props.createdAt}
                </h5>
                {
                    this.props.createdBy && this.props.auth._id == this.props.createdBy.id ? (
                        <div>
                            <Link to={`/campgrounds/${this.props._id}/edit`}>
                            <button className='btn btn-warning'>
                            Edit
                            </button>
                            </Link>
                            <br/>
                            <button onClick={this.handleDel} style={{marginTop: '6px'}} className='btn btn-danger'>
                            delete
                            </button>
                        </div>
                    ) : undefined
                }
                <p className='card-text'>
                    {this.props.description}
                </p>
            </div>
        </div>
        )
    }
}
const mapsToState = (state) => {
    return {
        auth: state.auth
    }
}
export default connect(mapsToState)(Cardimage);