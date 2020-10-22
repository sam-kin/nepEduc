import React from 'react';
import {
    Typography,
    Container,
    Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const FirstForm = (props) => {
    const { setIsStudent } = props;
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Typography
                variant="h3"
            >Personalisez les contenues selon vos preferences.</Typography>
            <Typography
                variant="h6"
                className={classes.typo}
            >1. Etes-vous etudiant a l'universite de kinshasa?</Typography>
            <div className={classes.controller}>
                <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={() => setIsStudent(true)}
                    className={classes.button}
                    size="large"
                >oui</Button>
                <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={() => setIsStudent(false)}
                    size="large"
                    className={classes.button}
                >non</Button>
            </div >
        </Container >
    );
};

const useStyles = makeStyles({
    button: { color: "#fff", margin: 10 },
    container: { padding: 0 },
    typo: { margin: '20px 0', color: '#555' },
    controller: { display: 'flex', justifyContent: 'center' }
});

export default FirstForm;