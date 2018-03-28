import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

const PublicRoute = ({
    isAuth,
    component: Component,
    ...rest
}) => {
    return (
        <Route {...rest} component={(props) => {
            return (
                isAuth ? (
                    <div>
                        <Component {...props} />
                    </div>
                ) : (
                    <Redirect to='/campgrounds' />
                )
            )
        }} />
    )
}
const mapsToState = (state) => {
    return {
        isAuth: !state.auth._id
    }
}
export default connect(mapsToState)(PublicRoute);