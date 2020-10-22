import React from 'react';
import {
    TextField,
    IconButton,
    InputLabel,
    InputAdornment,
    FormControl,
    OutlinedInput
} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';

import {loginUseStyle} from '../../styles/useStyles';


const SecondRegisterForm = (props) => {
    const classes = loginUseStyle();
    const {state, handleChange, handleBlur} = props;

    return (
        <>
            <TextField
                variant="outlined"
                label="Nom d'utilisateur"
                placeholder="username"
                type="text"
                name="username"
                value={state.username}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                InputLabelProps={{shrink: false, className: classes.label}}
                InputProps={{className: classes.input}}
                className={classes.simpleField}
                required
                error={state.errors['username'] ? true : false}
                helperText={state.errors['username']}
            /> 
           <TextField
                variant="outlined"
                label="Numero de telephone"
                placeholder="numero de telephone"
                type="tel"
                name="tel"
                value={state.tal}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                InputLabelProps={{shrink: false, className: classes.label}}
                InputProps={{className: classes.input}}
                className={classes.simpleField}
                required
                error={state.errors['tel'] ? true : false}
                helperText={state.errors['tel']}
            /> 
            <Password 
                {...{state, handleChange, handleBlur, label: "Mot de passe", id: "password"}}
            />
            <Password 
                {...{state, handleChange, handleBlur, id: "confirmPassword", label: "Confirmer mot de passe"}}
            />
        </>
    );
};

export default SecondRegisterForm;

const Password = (props) => {
    const classes = loginUseStyle();

    const {state, handleChange, handleBlur, label, id} = props;
    const [visiblePass, setVisiblePassword] = React.useState('');

    const togglePassword = () => setVisiblePassword(!visiblePass);
    return (
        <FormControl
            margin="normal"
            required
            error={state.errors[id] ? true : false}
            className={classes.simpleField}
        >
            <InputLabel htmlFor="password" className={classes.label}>{label}</InputLabel>
            <OutlinedInput 
                className={classes.input}
                id={id}
                name={id}
                type={visiblePass? 'text' : "password"}
                value={state[id]}
                onChange={handleChange}
                onBlur={handleBlur}
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
    )
}