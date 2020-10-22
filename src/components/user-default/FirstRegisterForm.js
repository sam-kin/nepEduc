import React, {useRef, useState, useEffect} from 'react';
import {
    TextField,
    Grid,
    MenuItem, Typography
} from '@material-ui/core';

import {loginUseStyle} from '../../styles/useStyles';
import {getArray, getMonthDays} from '../../helpers/helper';

const FirstRegisterForm = (props) => {
    const {state, setState, handleChange, handleBlur} = props;
    const classes = loginUseStyle();
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const days = useRef(getMonthDays({m: 2, y: 2000}));

    useEffect(() => {
        if (day && month && year) {
            const date = new Date(year, month, day);
            setState({...state, birth_date: date});
        }
    }, [day, month, year]);

    const handleDateFieldsChange = (e, setter) => {
        const {name, value} = e.target;

        // Save to the state
        setter(value);
        setState({
            ...state,
            touched: {
                ...state.touched,
                [name]: true
            }
        });
    };


    return (
        <>
            <TextField
                variant="outlined"
                label="nom"
                placeholder="nom"
                name="f_name"
                type="text"
                value={state.f_name}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                InputLabelProps={{shrink: false, className: classes.label}}
                InputProps={{className: classes.input}}
                className={classes.simpleField}
                required
                error={state.errors['f_name'] ? true : false}
                helperText={state.errors['f_name']}
            /> 
           <TextField
                variant="outlined"
                label="Post-nom"
                placeholder="post-nom"
                type="text"
                name="l_name"
                value={state.l_name}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                InputLabelProps={{shrink: false, className: classes.label}}
                InputProps={{className: classes.input}}
                className={classes.simpleField}
                required
                error={state.errors['l_name'] ? true : false}
                helperText={state.errors['l_name']}
            /> 
           <TextField
                variant="outlined"
                label="Prenom"
                placeholder="prenom"
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                InputLabelProps={{shrink: false, className: classes.label}}
                InputProps={{className: classes.input}}
                className={classes.simpleField}
                required
                error={state.errors['name'] ? true : false}
                helperText={state.errors['name']}
            /> 

            <Grid container style={{marginTop: "10px"}} spacing={1}>
                <Grid item xs={12}><Typography variant="body1">Date de naissance</Typography></Grid>
                <Grid item xs={2} sm>
                    <TextField
                        id="day"
                        label="Jour"
                        select
                        name="day"
                        value={day}
                        onChange={(e) => handleDateFieldsChange(e, setDay)}
                        onBlur={handleBlur}
                        variant="outlined"
                        margin="normal"
                        className={classes.simpleField}
                        required
                        error={state.errors['day'] ? true : false}
                    >
                        {days.current.map(d => (
                            <MenuItem key={d} value={d}>{d + 1}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={3} sm>
                    <TextField
                        select
                        label="Mois"
                        value={month}
                        name="month"
                        onChange={(e) => handleDateFieldsChange(e, setMonth)}
                        onBlur={handleBlur}
                        variant="outlined"
                        margin="normal"
                        className={classes.simpleField}
                        required
                        error={state.errors['month'] ? true : false}
                    >
                        {getArray(12).map(m => (
                            <MenuItem key={m} value={m}>{m + 1}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={5} sm>
                    <TextField
                        select
                        label="Annee"
                        value={year}
                        name="year"
                        onChange={(e) => handleDateFieldsChange(e, setYear)}
                        variant="outlined"
                        margin="normal"
                        className={classes.simpleField}
                        required
                        error={state.errors['year'] ? true : false}
                    >
                        {getArray(0, 1920, 2006).sort((a, b) => b - a).map(y => (
                            <MenuItem key={y} value={y}>{y}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">
                        <strong>Note:</strong> La date de naissance, permetra de personaliser votre contenu.
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default FirstRegisterForm;