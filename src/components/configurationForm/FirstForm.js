import React from 'react';
import {
    Typography,
    Container,
    Button
} from '@material-ui/core';

import { btnStyles } from '../../styles/useStyles';

const FirstForm = (props) => {
    const { onYes, onNo, setStudentInfos } = props;
    const btnClasse = btnStyles();
    return (
        <Container style={{ pading: 0 }}>
            <Typography
                variant="h4"
            >Personalisez les contenues selon vos preferences.</Typography>
            <form>
                <Typography
                    variant="h6"
                    style={{ margin: '20px 0', color: '#555' }}
                >1. Etes-vous etudiant a l'universite de kinshasa?</Typography>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        classes={btnClasse}
                        type="button"
                        onClick={onYes}
                        size="large"
                        style={{ color: "#fff" }}
                    >oui</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        classes={btnClasse}
                        type="button"
                        onClick={onNo}
                        size="large"
                        style={{ color: "#fff" }}
                    >non</Button>
                </div>
            </form>
        </Container>
    );
};

export default FirstForm;