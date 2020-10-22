import { makeStyles } from '@material-ui/core/styles';
import { BorderBottom } from '@material-ui/icons';

export const modalStyle = makeStyles(theme => ({
    root: {
        width: 440,
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        borderRadius: 15,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        '&:focus': {
            outline: 'none'
        }
    },
    modalHeader: {
        height: 50,
        boxShadow: "0 1px 1px #00000029",
        padding: "10px 24px",
        alignItems: "center",
        textTransform: "capitalize"
    },
    modalBody: {
        height: 'calc(100% - 107px)',
        padding: theme.spacing(2),
        overflowY: 'auto'
    },
    modalFooter: {
        height: 70,
        padding: "2px 24px",
        borderTop: '1px solid #efefef'
    }
}));