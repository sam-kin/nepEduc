import React from 'react';
import {
    Container,
    Paper,
    Typography,
} from '@material-ui/core';
import {loginUseStyle as useStyles} from '../../styles/useStyles';

import RegisterForm from './RegisterForm';
import ShadowPaper from '../ShadowPaper';

const RegisterPage = ({history}) => {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.root}>
                <Container style={{width: "100%", height: "100vh"}}>
                    <ShadowPaper 
                        style={{minHeight: "505px", position: "relative", overflow: "hidden"}}
                        title={
                            <Typography variant="h5" align="center"
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    padding: "10px 0",
                                    width: "100%",
                                    boxShadow: "0 1px 1px #00000029",
                                    color: "rgb(51 51 51 / 78%)",
                                }}
                            >Enregistrez-vous</Typography>
                        }
                        body={<RegisterForm history={history}/>}
                    />
                </Container>
            </Paper>
        </div>
    );
};

export default RegisterPage;