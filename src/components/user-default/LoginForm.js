import React from 'react';
import {
    TextField,
    FormControl,
    InputLabel,
    InputAdornment,
    OutlinedInput,
    Button,
    IconButton,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
    Visibility,
    VisibilityOff
} from '@material-ui/icons';
import { loginUseStyle, btnStyles } from '../../styles/useStyles';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { loginUser, actions } from '../../reducers/redux/authSlices';

const LoginForm = (props) => {
    const classes = loginUseStyle();
    const btnClasses = btnStyles();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [visiblePass, setVisiblePassword] = React.useState('');

    const togglePassword = () => setVisiblePassword(!visiblePass);

    const reqStatus = useSelector(state => state.auth.reqStatus);
    const error = useSelector(state => state.auth.error);
    const dispatch = useDispatch();

    const canSave = username !== "" && password !== "" && reqStatus === "idle";

    const onFormSubmit = async e => {
        e.preventDefault();
        if (canSave) {

            dispatch(loginUser({ username, password })).then(resp => {
                if (resp.payload.status === "authenticated") {
                    setUsername('');
                    setPassword('');
                    props.history.push('/');
                }
                dispatch(actions.setReqStatus('idle'));
            });
        }
    };

    return (
        <form style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItem: 'center',
            width: 300
        }} onSubmit={onFormSubmit}>
            {error ? <Alert
                variant="standard"
                color="error"
                severity="error"
            >{error}</Alert> : null}
            <TextField
                variant="outlined"
                label="nom d'utilisateur"
                placeholder="monNom"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                margin="normal"
                InputLabelProps={{ shrink: false, className: classes.label }}
                InputProps={{ className: classes.input }}
                className={classes.simpleField}
            />
            <FormControl
                className={classes.simpleField}
                margin="normal"
            >
                <InputLabel htmlFor="password" className={classes.label}>mot de passe</InputLabel>
                <OutlinedInput
                    className={classes.input}
                    id="password"
                    name="password"
                    type={visiblePass ? 'text' : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                                onClick={togglePassword}
                            >
                                {visiblePass ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <Button
                classes={btnClasses}
                variant="contained"
                color="primary"
                disabled={!canSave}
                type="submit"
                style={{ color: "#fff" }}
            >Connecter</Button>

            <Link
                to='/register'
                style={{ textDecoration: "none" }}
            >
                <Button
                    classes={btnClasses}
                    variant="outlined"
                    color="primary"
                    type="button"
                >Creer un compte</Button>
            </Link>
        </form>
    );
};

export default LoginForm