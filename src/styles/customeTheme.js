import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: "#17bf63",
        },
        secondary: {
            main: "#e0245e",
            contrastText: "#fff"
        },
        contrastThreshold: 10,
        tonalOffset: 0.1,
        background: {
            default: "#f6fff7",
            paper: '#fff'
        },
    },
    typography: {
        h5: {
            fontWeight: "lighter",
            lineHeight: '1.5',
            marginBottom: 10
        }
    }

});