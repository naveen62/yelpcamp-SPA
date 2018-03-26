import React from 'react';
import axios from 'axios';
import MDSpinner from 'react-md-spinner'

class FormCampground extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            price: 0,
            description: '',
            selectedFile: null,
            loading: false
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
        this.setState(() => ({
            loading: true
        }))
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        fd.append('name', this.state.name);
        fd.append('price', this.state.price);
        fd.append('description', this.state.description)
        axios.post('http://localhost:3000/api/campground', fd)
        .then((res) => {
            // this.props.onSubmit(res.data.campground)
            console.log(res.data.campground)
        }).catch((err) => {
            console.log(err)
        })
    }
    render() {
        return (
            <div className='form'>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label>Name:</label>
                        <input onChange={this.handleName} type="text" className='form-control' placeholder='Campground Name' />
                    </div>
                    <div className='form-group'>
                        <label>Price:</label>
                        <input onChange={this.handlePrice} type="number" className='form-control' placeholder='Campground Price' />
                    </div>
                    <div className='form-group'>
                        <label>description</label>
                        <textarea onChange={this.handleDescription} className='form-control' rows='5'></textarea>
                    </div>
                    <div className='form-group'>
                        <label>Upload image:</label>
                        <input type="file" onChange={this.handleFile} className='form-control-file' accept='image/*' />
                    </div>
                    <button type="submit" className='btn btn-success btn-lg'>
                    {this.state.loading ? <MDSpinner size={35} singleColor='#ffff'/> : 'Add Campground' }
                    </button>
                </form>
            </div>
        )
    }
}
export default FormCampground;