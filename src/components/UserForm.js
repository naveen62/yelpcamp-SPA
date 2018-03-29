import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import MDSpinner from 'react-md-spinner';
import {connect} from 'react-redux';
import {addUser} from '../actions/auth';
import {ToastContainer, toast} from 'react-toastify'

class UserForm extends React.Component {
    state = {
        email: undefined,
        password: undefined,
        loading: false
    }
    handleEmail = (e) => {
        const email = e.target.value;
        this.setState(() => ({
            email,
        }))
    }
    handlePassword = (e) => {
        const password = e.target.value;
        this.setState(() => ({
            password,
        }))
    }
    handleAuth = e => {
        e.preventDefault();
        if(window.location.pathname == '/signup') {
            this.setState(() => ({
                loading: true
            }))
            axios.post(`${window.location.protocol}//${window.location.hostname}/api/user`, {
                email: this.state.email,
                password: this.state.password
            }).then((res) => {
                this.props.dispatch(addUser(res.data.newUser, res.data.token));
                Cookies.set('token', `${res.data.token}`);
                this.props.onSubmit()
            }).catch((err) => {
                this.setState(() => ({
                    loading: false
                }))
                toast.error(`${err.response.data.msg}`)
            })
        } else if(window.location.pathname == '/signin') {
            this.setState(() => ({
                loading: true
            }))
            axios.post(`${window.location.protocol}//${window.location.hostname}/api/user/login`, {
                email: this.state.email,
                password: this.state.password
            }).then((res) => {
                this.props.dispatch(addUser(res.data.SendUser, res.data.token));
                Cookies.set('token', `${res.data.token}`);
                this.props.onSubmit()
            }).catch((err) => {
                this.setState(() => ({
                    loading: false
                }))
                toast.error(`${err.response.data.msg}`)
            })
        }
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleAuth}>
                    <div className='form-group'>
                        <label>Email:</label>
                        <input onChange={this.handleEmail} type="email" className='form-control' placeholder='Enter Your Email' required />
                    </div>
                    <div className='form-group'>
                        <label>Password:</label>
                        <input onChange={this.handlePassword} type="password" className='form-control' placeholder='Enter Your Password' required />
                    </div>
                    <button type='submit' className='btn btn-success btn-block'>
                    {this.state.loading ? <MDSpinner size={30} singleColor='#ffff'/>: this.props.button}
                    </button>
                </form>
                <ToastContainer autoClose={3000} />
            </div>
        )
    }
}
export default connect()(UserForm)