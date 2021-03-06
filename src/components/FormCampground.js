import React from 'react';
import axios from 'axios';
import MDSpinner from 'react-md-spinner'
import Cookies from 'js-cookie';
import { connect } from 'react-redux'
import {ToastContainer, toast} from 'react-toastify';
import {history} from '../routes/AppRouter';

class FormCampground extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.camp ? props.camp.name : '',
            price: props.camp ? props.camp.price : '',
            description: props.camp ? props.camp.description : '',
            selectedFile: null,
            loading: false,
            alert: false
        }
    }
    handleName = (e) => {
        const name = e.target.value;
        this.setState(() => ({
            name
        })) 
    }
    handlePrice = e => {
        const price = e.target.value
        this.setState(() => ({
            price
        }))
    }
    handleDescription = e => {
        const description = e.target.value;
        this.setState(() => ({
            description
        }))
    }
    handleFile = e => {
        const file = e.target.files[0]
        this.setState(() => ({
            selectedFile: file
        }))
    }
    handleSubmit = e => {
        e.preventDefault()
        if(this.props.auth.token) {
        this.setState(() => ({
            loading: true
        }))
        const header = {
            headers: {'x-auth': `${this.props.auth.token}`}
        }
        const fd = new FormData();
        if(this.state.selectedFile) {
            fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        }
        fd.append('name', this.state.name);
        fd.append('price', this.state.price);
        fd.append('description', this.state.description)
        if(this.props.camp) {
            fd.append('imgId', this.props.camp.image.id);
        }
        if(!this.props.camp) {
        axios.post(`${window.location.protocol}//${window.location.hostname}/api/campground`, fd, {
            headers: {'x-auth': `${this.props.auth.token}`},
            onUploadProgress: e => {
                console.log('Upload progress ', Math.round(e.loaded / e.total * 100) + '%')
            }
        })
        .then((res) => {
            console.log(res.data.campground)
            this.props.onSubmit(res.data.campground)
        }).catch((err) => {
            console.log(err)
        })
      } else {
        axios.patch(`${window.location.protocol}//${window.location.hostname}/api/campground/${this.props.camp._id}`, fd, header)
        .then((res) => {
            console.log(res.data.campground)
            if(res.data.campground) {
                this.props.onSubmit(res.data.campground._id ,res.data.campground);
            }
        }).catch((err) => {
            console.log(err)
        })
      }
    } else {
         toast.error('Please Sign in to procduce')
         setTimeout(() => {
             history.push('/signin')
         }, 3000);
    }
    }
    render() {
        return (
            <div className='form'>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label>Name:</label>
                        <input value={this.state.name} onChange={this.handleName} type="text" className='form-control' placeholder='Campground Name' />
                    </div>
                    <div className='form-group'>
                        <label>Price:</label>
                        <input value={this.state.price} onChange={this.handlePrice} type="number" className='form-control' placeholder='Campground Price' />
                    </div>
                    <div className='form-group'>
                        <label>description</label>
                        <textarea value={this.state.description} onChange={this.handleDescription} className='form-control' rows='5'></textarea>
                    </div>
                    <div className='form-group'>
                        <label>Upload image:</label>
                        <input type="file" onChange={this.handleFile} className='form-control-file' accept='image/*' />
                    </div>
                    <button type="submit" className='btn btn-success btn-lg'>
                    {this.state.loading ? <MDSpinner size={35} singleColor='#ffff'/> : 'Add Campground' }
                    </button>
                </form>
                <ToastContainer autoClose={false} />
            </div>
        )
    }
}
const mapsToState = (state) => {
    return {
        auth: state.auth
    }
} 
export default connect(mapsToState)(FormCampground);