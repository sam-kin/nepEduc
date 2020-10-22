import React from 'react';
import {
    Container,
    Grid,
    Avatar,
    Typography,
    Button
} from '@material-ui/core';
import LeftMenuList from './LeftMenuList';
import { asideStyles } from '../../styles/homepageStyles';

const LeftAside = ({ user }) => {
    const classes = asideStyles();
    return (
        <Container className={classes.root}>
            <Grid container spacing={4}>
                <Grid item xs={12} container className={classes.user}>
                    <Grid item xs={3}>
                        <Avatar>{user.name[0]}</Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6">{user.fullName ? user.fullName : user.f_name + " " + user.l_name}</Typography>
                        <Typography variant="caption">{user.status ? user.status : "User"}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} container>
                    <LeftMenuList />
                </Grid>
                <Grid item xs={12} container style={{ padding: '0 26px', marginTop: 50 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.asideBtn}
                        style={{ color: '#fff' }}
                    >Creer</Button>
                </Grid>
                <Grid item xs={12} container className={classes.bottom}>
                    <Button
                        variant="text"
                        color="primary"
                        className={classes.asideBtn}
                    >Preferences</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default LeftAside;