import React, { useState, useEffect } from 'react';
import {
    TextField,
    Container,
    Typography,
    MenuItem,
} from '@material-ui/core';

import axios from 'axios';

import univData from '../../helpers/dataFetchFuncs';

import { useSelector } from 'react-redux';

import { getAllFaculties } from '../../reducers/studentReducers/facultySclices';

import { loginUseStyle } from '../../styles/useStyles';

import CircularProgress from '../CircularProgress';

const StudentForm = (props) => {
    const classes = loginUseStyle();
    const { studentInfos, setStudentInfos, user } = props;

    const [reqStatus, setReqStatus] = useState('idle');
    const [exist, setExist] = useState(false);

    let [data, setData] = useState({
        facs: [],
        departs: [],
        options: [],
        proms: []
    });

    const handleOnchange = (e) => {
        setReqStatus('pending');

        const { name, value } = e.target;
        const propname = name === 'faculty' ? 'departs' : name === 'department' ? 'options' : 'proms';

        univData[propname](value).then(res => {
            if (res.data.status === 'failed') {
                setReqStatus('failed');
                return console.log(res.data.message);
            }

            setData({
                ...data,
                [propname]: res.data
            });

            setReqStatus('idle');
        });

        setStudentInfos({
            ...studentInfos,
            [name]: value
        });
    };

    const handleCheckExist = async (e) => {
        setReqStatus('pending');
        axios.post(`/api/prom/checkname/${e.target.value}`).then(res => {
            if (res.data.status === 'failed') {
                setReqStatus('failed');
                return console.log(res.data.message);
            }

            if (res.status === 'unfound') {
                setExist(false);
            } else if (res.status === 'found') {
                setExist(true);
            }

            setStudentInfos({
                ...studentInfos,
                promotion: e.target.value
            });

            setReqStatus('idle');
        });
    };

    useEffect(() => {
        setReqStatus('pending');
        univData.facs(studentInfos.university)
            .then(res => {
                if (res.data.status === 'failed') {
                    setReqStatus('failed');
                    return console.log(res.data.message);
                }

                setData({
                    ...data,
                    facs: res.data
                });

                setReqStatus('idle');
            });
    }, [studentInfos.university]);

    return (
        <Container>
            {
                reqStatus === 'pending' ?
                    <CircularProgress /> :
                    null
            }
            <form>
                <Typography variant="h4">Information de l'etudiant</Typography>
                {data.facs.length > 0 ?
                    <>
                        <Typography variant="body1">Selectionnez votre faculte</Typography>
                        <TextField
                            select
                            name="faculty"
                            variant="outlined"
                            value={studentInfos.faculty}
                            onChange={handleOnchange}
                            margin="normal"
                            className={classes.simpleField}
                            InputLabelProps={{ shrink: false, className: classes.label }}
                            InputProps={{ className: classes.input }}
                            required
                        >
                            {data.facs.map(fac => (
                                <MenuItem
                                    key={fac._id}
                                    value={fac._id}
                                >{fac.name}</MenuItem>
                            ))}
                        </TextField>
                    </> : null
                }
                {data.departs.length > 0 ?
                    <>
                        <TextField
                            select
                            label="Departement"
                            name="department"
                            variant="outlined"
                            value={studentInfos.department}
                            onChange={handleOnchange}
                            margin="normal"
                            className={classes.simpleField}
                            InputLabelProps={{ shrink: false, className: classes.label }}
                            InputProps={{ className: classes.input }}
                            required
                        >
                            {data.departs.map(depart => (
                                <MenuItem
                                    key={depart._id}
                                    value={depart._id}
                                >{depart.name}</MenuItem>
                            ))}
                        </TextField>
                    </> : null
                }
                {data.options.length > 0 ?
                    <>
                        <TextField
                            select
                            label="Options"
                            name="option"
                            variant="outlined"
                            value={studentInfos.option}
                            onChange={handleOnchange}
                            margin="normal"
                            className={classes.simpleField}
                            InputLabelProps={{ shrink: false, className: classes.label }}
                            InputProps={{ className: classes.input }}
                            required
                        >
                            {data.options.map(option => (
                                <MenuItem
                                    key={option._id}
                                    value={option._id}
                                >{option.name}</MenuItem>
                            ))}
                        </TextField>
                    </> : null
                }
                {data.proms.length > 0 ?
                    <>
                        <TextField
                            select
                            label="Niveau"
                            name="levels"
                            variant="outlined"
                            value={studentInfos.promotion}
                            onChange={handleCheckExist}
                            margin="normal"
                            className={classes.simpleField}
                            InputLabelProps={{ shrink: false, className: classes.label }}
                            InputProps={{ className: classes.input }}
                            required
                        >
                            {data.proms.map(prom => (
                                <MenuItem key={prom._id} value={prom._id}>{prom.level} {data.options.find(o => o._id === prom.option).name}</MenuItem>
                            ))}
                        </TextField>
                    </> : null
                }
                {
                    exist ?
                        <Typography variant="body1">Appuyez sur Terminer pour finir.</Typography> :
                        <>
                            <Typography variant="body1">Le nom {user.fullname} n'existe pas en {data.proms.find(p => p._id === studentInfos.promotion)} {data.options.find(o => o._id === prom.option).name}</Typography>
                        </>
                }
            </form>
        </Container>
    );
};

export default StudentForm;