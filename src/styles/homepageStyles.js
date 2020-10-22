import {makeStyles} from '@material-ui/core/styles';

export const globalStyles = makeStyles(theme => ({
    root: {

    },
}));

export const asideStyles = makeStyles(theme => ({
    root: {
        height: 'calc(100vh - 78px)',
        width: '25%',
        position: 'fixed',
        top: 70,
        left: 24,
        padding: '20px 0 20px 10px',
        backgroundColor: "#fff",
        boxShadow: "0px 0px 4px #e0e0e066",
        borderRadius: 10
    },
    user: {
    },
    asideMenu: {
        width: "100%",
        padding: 0,
        marginTop: 8
    },
    asideMenuItem: {
        marginBottom: 10,
        borderBottomLeftRadius: 25,
        borderTopLeftRadius: 25
    },
    asideBtn: {
        width: "100%",
        textTransform: 'capitalize',
        borderRadius: '25px'
    },
    bottom: {
        position: "absolute",
        bottom: 20,
        left: 10
    }
}));