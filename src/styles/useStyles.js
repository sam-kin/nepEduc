import {makeStyles} from '@material-ui/core/styles';

export const loginUseStyle = makeStyles({
    root: {
        minWidth: "100vw",
        minHeight: "100vh",
        borderRadius: 0,
    },
    shadowPaper: {
        borderRadius: 8,
        padding: 20,
        boxShadow: "1px 5px 12px 1px rgb(119 119 119 / 10%), 1px 1px 1px 0px rgb(119 119 119 / 10%), 1px -1px 11px 0px rgb(119 119 119 / 10%), -1px 1px 1px 0px rgb(119 119 119 / 10%);",
    },
    centered: {
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
    },
    simpleField: {
        color: "#333",
        width: "100%",
        '& .MuiOutlinedInput-input': {
            padding: "1em 1.3em",
            fontSize: 13,
        },
    },
    input: {
        marginTop: 4,
        borderRadius: 8
    },
    label: {
        transform: 'none',
        marginLeft: '.3rem',
        textTransform: 'capitalize',
        position: "static"
    },
});

export const btnStyles = makeStyles({
    root: {
        borderRadius: 8,
        margin: "10px 0",
        width: "100%",
    },
    label:{
        textTransform: "capitalize",
    }
});

export const nextBtnStyles = makeStyles({
    root: {
        borderRadius: 8,
        margin: "10px 0",
        width: "fit-content",
    },
    label:{
        textTransform: "capitalize",
    }
});