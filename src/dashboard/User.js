import React from 'react';
import Hero from '../components/Hero';
import UserForm from '../components/UserForm';

const User = (props) => (
    <div>
        <Hero head={props.headText} button={false} />
        <div className='container'>
        <div className='row justify-content-center'>
            <div className='col-lg-4 col-sm-10'>
                <UserForm button={props.buttonText} onSubmit={() => {
                    props.history.push('/campgrounds');
                }} />
            </div>  
        </div>
        </div>
    </div>
)
export default User;