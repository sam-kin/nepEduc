import React from 'react';
import {
    Box, Paper
} from '@material-ui/core';
import {loginUseStyle as useStyles} from '../styles/useStyles';

const ShadowPaper = ({title, body, ...rest}) => {
    const classes = useStyles();
    return (
        <Box className={classes.centered} >
            <Paper className={classes.shadowPaper} {...rest}>
                {title}
                {body}
            </Paper>
        </Box>
    );
};

export default ShadowPaper;