import React from 'react';
import {
    Typography,
    Container,
    Button
} from '@material-ui/core';

import { btnStyles } from '../../styles/useStyles';

const SecondForm = (props) => {
    const { onYes, onNo } = props;
    const btnClasse = btnStyles();
    return (
        <Container>
            <Typography
                variant="h4"
            >Qui etes-vous ?</Typography>
            <form>
                <div>
                </div>
            </form>
        </Container>
    );
};

export default SecondForm;