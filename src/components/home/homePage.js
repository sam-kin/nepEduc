import React, { useEffect } from 'react';
import {
    Grid,
} from '@material-ui/core';
import { useSelector } from 'react-redux';

import { Redirect } from 'react-router-dom';

import { getUser } from '../../reducers/redux/authSlices';
import { getReqStatus } from '../../reducers/redux/studentReducers/universitySlices';

import LeftAside from './LeftAside';
import CircularProgress from '../CircularProgress';

const HomePage = () => {
    const user = useSelector(getUser);
    const reqStatus = useSelector(getReqStatus);

    return (
        <>
            {
                user.account.type === 'unset' ?
                    <Redirect to='/configuration' /> :
                    null
            }
            <Grid container>
                <Grid item xs={3}>
                    <LeftAside user={user} />
                </Grid>
                <Grid item xs={4}>
                    {reqStatus === 'pending' ? <CircularProgress /> : null}
                </Grid>
                <Grid item xs={3}>

                </Grid>
            </Grid>
        </>
    );
};

export default HomePage;
