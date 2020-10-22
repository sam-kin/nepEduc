import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles(theme => ({
    root: {
        maxHeight: 64,
        padding: 0,
        background: theme.palette.common.white,
        boxShadow: "0px 1px 2px -1px rgb(0 0 0 / 12%), 0px 1px 3px 0px rgb(0 0 0 / 10%), 0px 1px 5px 0px rgb(0 0 0 / 9%)"
    },
    outerMenuItem: {
        marginTop: "5px",
        textDecoration: "none",
        color: "inherit",
        width: "70%",
        display: "flex",
    },
    innerMenuItem: {
        textAlign: "center",
        padding: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        '&:hover': {
            backgroundColor: '#e0e0e07d'
        },
        borderRadius: 27
    },
    activeMenuItem: {
        borderBottom: "4px solid #17bf63",
        '&>*': {
            '&:hover': {
                backgroundColor: "inherit"
            }
        }
    },
    leftmenu: {
        justifyContent: "center",
        alignItems: "center"
    },
    iconButton: {
        backgroundColor: "#5a8a6517",
        width: 36,
        height: 36
    },

}));