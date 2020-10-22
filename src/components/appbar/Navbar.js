import React from 'react';
import {
    AppBar,
    Avatar,
    Toolbar,
    Grid,
    IconButton,
    Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { styles } from '../../styles/navbarStyles';
import {
    ComputerOutlined,
    HomeOutlined,
    NotificationsActiveOutlined,
    SearchOutlined,
    NotificationsOutlined,
    MessageOutlined,
    ImportantDevicesOutlined,
} from '@material-ui/icons';

const Navbar = ({ user }) => {
    const classes = styles();

    return (
        <AppBar
            className={classes.root}
        >
            <Toolbar>
                <Grid container spacing={3}>
                    <Grid item xs justify="flex-start" container alignItems="center">
                        <Typography variant="h4" color="primary">Nep</Typography>
                    </Grid>
                    <Grid item xs={6} container spacing={2}>
                        <Grid item xs justify="center" container alignItems="center">
                            <Link
                                to='/'
                                className={`${classes.outerMenuItem} ${classes.activeMenuItem}`}
                            >
                                <div className={classes.innerMenuItem}>
                                    <HomeOutlined color="primary" style={{ fontSize: 30 }} />
                                    <Typography component="span" style={{ fontSize: 10 }}>Accueil</Typography>
                                </div>
                            </Link>
                        </Grid>
                        <Grid item xs justify="center" container alignItems="center">
                            <Link
                                to='/classes'
                                className={classes.outerMenuItem}
                            >
                                <div className={classes.innerMenuItem}>
                                    <ComputerOutlined color="primary" style={{ fontSize: 30 }} />
                                    <Typography component="span" style={{ fontSize: 10 }}>Classes</Typography>
                                </div>
                            </Link>
                        </Grid>
                        <Grid item xs justify="center" container alignItems="center">
                            <Link
                                to='/alerts'
                                className={classes.outerMenuItem}
                            >
                                <div className={classes.innerMenuItem}>
                                    <NotificationsActiveOutlined color="primary" style={{ fontSize: 30 }} />
                                    <Typography component="span" style={{ fontSize: 10 }}>Alertes</Typography>
                                </div>
                            </Link>
                        </Grid>
                        <Grid item xs justify="center" container alignItems="center">
                            <Link
                                to='/'
                                className={classes.outerMenuItem}
                            >
                                <div className={classes.innerMenuItem}>
                                    <ImportantDevicesOutlined color="primary" style={{ fontSize: 30 }} />
                                    <Typography component="span" style={{ fontSize: 10 }}>Bats</Typography>
                                </div>
                            </Link>
                        </Grid>

                    </Grid>
                    <Grid item xs container className={classes.leftmenu} spacing={2}>
                        <Grid item sm />
                        <Grid item sm>
                            <IconButton className={classes.iconButton}>
                                <SearchOutlined />
                            </IconButton>
                        </Grid>
                        <Grid item sm>
                            <IconButton className={classes.iconButton}>
                                <NotificationsOutlined />
                            </IconButton>
                        </Grid>
                        <Grid item sm>
                            <IconButton className={classes.iconButton}>
                                <MessageOutlined />
                            </IconButton>
                        </Grid>
                        <Grid item sm container className={classes.leftmenu} >
                            <IconButton style={{ padding: 0 }} className={classes.iconButton}>
                                <Avatar
                                    style={{ width: 20, height: 20 }}
                                ></Avatar>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;