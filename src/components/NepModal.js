import React from 'react';

import {
    Modal,
    Grid, Typography
} from '@material-ui/core';

import { modalStyle } from '../styles/modalStyles';

const NepModal = (props) => {
    const { open, title, body, footer, bodyProps, footerProps } = props;
    const classes = modalStyle();

    const modalContent = (
        <section className={classes.root}>
            <Grid container>
                <Grid item xs={12} container className={classes.modalHeader}>
                    <Typography variant="h5">{title}</Typography>
                </Grid>
                <Grid item xs={12} className={classes.modalBody} {...bodyProps}>{body}</Grid>
                <Grid item xs={12} className={classes.modalFooter} {...footerProps}>{footer}</Grid>
            </Grid>
        </section>
    );
    return (
        <Modal
            open={open}
        >{modalContent}</Modal>
    );

};

export default NepModal;