import React from 'react';
import { Redirect, Link, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../../reducers/redux/authSlices';

export default function ProtectedAdminRoutes({ component: Component, ...rest }) {
    const user = useSelector(getUser);
    const isDelegue = user.account.authorization.some(a => a === 'delegue');
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isDelegue) {
                    return (
                        <Redirect to={{
                            pathname: "/",
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
}
