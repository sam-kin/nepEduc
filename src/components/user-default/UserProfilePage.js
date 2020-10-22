import React from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../reducers/redux/authSlices';

const UserProfilePage = () => {
    const user = useSelector(getUser);

    return (
        <h1>{user.name} Profile</h1>
    );
};

export default UserProfilePage;