import React from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    
} from '@material-ui/core';
import {loginUseStyle as useStyles} from '../../styles/useStyles';

import LoginForm from './LoginForm';
import ShadowPaper from '../ShadowPaper';

const LoginPage = ({history, ...rest}) => {
    const classes = useStyles();
    
    return (
        <div>
            <Paper className={classes.root}>
                <Grid container style={{minHeight: "100vh"}}>
                    <Grid item xs={12} sm style={{minHeight: "100%"}}>
                        <ShadowPaper 
                            title={<Typography variant="h5">Connectez-vous</Typography>}
                            body={<LoginForm history={history}/>}
                        />
                    </Grid>
                    <Grid item xs={12} sm style={{minHeight: "100%"}}>
                        <Box className={classes.centered}>
                            <Typography variant="h3">Restez informer et Apprenez en meme temps.</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default LoginPage;
