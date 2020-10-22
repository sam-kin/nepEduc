import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Isauthenticated } from '../reducers/redux/authSlices';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isAuth = useSelector(Isauthenticated);
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isAuth) {
                    return (
                        <Redirect to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                        />
                    );
                }
                return (
                    <Component />
                );
            }}
        />
    )
};

export default ProtectedRoute;