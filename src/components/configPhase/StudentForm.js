import React from 'react';

import {
    Typography,
    MenuItem,
    TextField,
    Button
} from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import CircularProgress from '../CircularProgress';

import { loginUseStyle } from '../../styles/useStyles';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUniversities } from '../../reducers/redux/studentReducers/universitySlices';
import { checkCookie } from '../../reducers/redux/authSlices';
import univData from '../../helpers/dataFetchFuncs';

const StudentForm = (props) => {
    const classes = loginUseStyle();
    const { studentState, handleChange, setCanSave, user, history } = props;
    const [level, setLevel] = React.useState('');
    const [isFound, setIsFound] = React.useState(false);
    const [isFormEnd, setIsFormEnd] = React.useState(false);
    const [ReqStatus, setReqStatus] = React.useState('idle');
    const universities = useSelector(getAllUniversities);
    const [state, setState] = React.useState({
        univs: universities,
        facs: [],
        departs: [],
        options: [],
        proms: [],
    });
    const [errors, setErrors] = React.useState({});

    const handleStateChange = (e, input) => {
        setReqStatus('pending');
        const name = input === 'university' ? 'facs' : input === 'faculty' ? 'departs' : input === 'department' ? 'options' : 'proms';

        univData[input](e.target.value).then(res => {
            if (res.data.status === 'failed') {
                setReqStatus('failed');
                return console.log(res.data);
            }

            setState({
                ...state,
                [name]: res.data
            });

            setReqStatus('idle');
        });

        handleChange(input)(e);
    };

    const handleLevelChange = (e) => {
        setReqStatus('pending');
        univData.checkName(e.target.value).then(res => {
            if (res.data.status === 'failed') {
                return console.log(res.data.error);
            }

            if (res.data.status === 'found') {
                setIsFound(true);
                setCanSave(true);
            } else {
                setIsFound(false);
                setCanSave(false);
            }

            setIsFormEnd(true);

        });

        setReqStatus('idle');
        setLevel(e.target.value);
    };

    const dispatch = useDispatch();

    const handleSendDemand = () => {
        setReqStatus('pending');
        univData.sendDemand(user.id, {
            university: studentState.university,
            fac: studentState.faculty,
            depart: studentState.department,
            option: studentState.option,
            promotion: studentState.promotion,
        }).then(res => {
            if (res.data.status === 'failed') {
                setReqStatus('idle');
                setErrors({
                    ...errors,
                    ['demand']: res.data.message
                });
                setCanSave(true);
                return console.log(res.data);
            }

            dispatch(checkCookie()).then(resp => {
                if (resp.data.status === 'failed') {
                    return console.log(resp.data);
                }

                setReqStatus('idle');
                history.push('/');
            });
        });
    };

    return (
        <>
            {
                isFormEnd ?
                    <div style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        {
                            isFound ?
                                <Typography>"Cliquez sur terminer pour finir la configuration."</Typography> :
                                <div style={{ textAlign: 'center', '& *': { marginBottom: 20 } }}>
                                    <Alert
                                        severity="warning"
                                        variant="standard"
                                        color="warning">{
                                            errors.demand ?
                                                errors.demand :
                                                <>Le nom <strong>{user.full_name}</strong> ne figure pas dans la liste des etudiants de {state.proms.find(p => p._id === level).level} ${state.options.find(o => o._id === studentState.option).name}</>
                                        }
                                    </Alert>
                                    <Button
                                        variant="text"
                                        color="primary"
                                        onClick={handleSendDemand}
                                        style={{ marginTop: 20, textTransform: "initial" }}
                                    >Evoyer une demande au CP de la promotion</Button>
                                </div>
                        }
                    </div> :
                    <div>
                        {
                            ReqStatus === 'pending' ?
                                <CircularProgress /> :
                                null
                        }
                        <form>
                            <Typography variant="h5" style={{ marginBlock: 5 }}>Information de l'etudiant</Typography>
                            <TextField
                                select
                                name="university"
                                label="Universite"
                                value={studentState.university}
                                onChange={e => handleStateChange(e, 'university')}
                                variant="outlined"
                                margin="normal"
                                className={classes.simpleField}
                                InputLabelProps={{ shrink: false, className: classes.label }}
                                InputProps={{ className: classes.input }}
                                required
                            >
                                {state.univs.map(univ => (
                                    <MenuItem
                                        key={univ.id}
                                        value={univ.id}
                                    >{univ.full_name}</MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                name="faculty"
                                label="Faculte"
                                value={studentState.faculty}
                                onChange={e => handleStateChange(e, 'faculty')}
                                variant="outlined"
                                margin="normal"
                                className={classes.simpleField}
                                InputLabelProps={{ shrink: false, className: classes.label }}
                                InputProps={{ className: classes.input }}
                                disabled={state.facs.length === 0}
                                required
                            >
                                {state.facs.map(fac => (
                                    <MenuItem
                                        key={fac._id}
                                        value={fac._id}
                                    >{fac.name}</MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                label="Departement"
                                name="department"
                                value={studentState.department}
                                onChange={e => handleStateChange(e, 'department')}
                                variant="outlined"
                                margin="normal"
                                className={classes.simpleField}
                                InputLabelProps={{ shrink: false, className: classes.label }}
                                InputProps={{ className: classes.input }}
                                disabled={state.departs.length === 0}
                                required
                            >
                                {state.departs.map(depart => (
                                    <MenuItem
                                        key={depart._id}
                                        value={depart._id}
                                    >{depart.name}</MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                label="Options"
                                name="option"
                                value={studentState.option}
                                onChange={e => handleStateChange(e, 'option')}
                                variant="outlined"
                                margin="normal"
                                className={classes.simpleField}
                                InputLabelProps={{ shrink: false, className: classes.label }}
                                InputProps={{ className: classes.input }}
                                disabled={state.options.length === 0}
                                required
                            >
                                {state.options.map(option => (
                                    <MenuItem
                                        key={option._id}
                                        value={option._id}
                                    >{option.name}</MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                label="Niveau"
                                name="levels"
                                value={level}
                                onChange={handleLevelChange}
                                variant="outlined"
                                margin="normal"
                                className={classes.simpleField}
                                InputLabelProps={{ shrink: false, className: classes.label }}
                                InputProps={{ className: classes.input }}
                                disabled={studentState.option === ''}
                                required
                            >
                                {state.proms.map(prom => (
                                    <MenuItem key={prom._id} value={prom._id}>{prom.level} {state.options.find(o => o._id === prom.option).name}</MenuItem>
                                ))}
                            </TextField>

                        </form>
                    </div>
            }
        </>
    )
}

export default StudentForm;
