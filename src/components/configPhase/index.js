import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Grid, Button } from '@material-ui/core';
import { NavigateBefore, SettingsInputAntennaOutlined } from '@material-ui/icons';

import NepModal from '../NepModal';
import FirstForm from './FirstForm';
import StudentForm from './StudentForm';
import CircularProgress from '../CircularProgress';

import { getUser, checkCookie } from '../../reducers/redux/authSlices';

import uniData from '../../helpers/dataFetchFuncs';

import { btnStyles, nextBtnStyles } from '../../styles/useStyles';

const Configuration = (props) => {
    const user = useSelector(getUser);
    const [state, setState] = useState({
        current: 1,
        isStudent: false,
        university: '',
        faculty: '',
        department: '',
        option: '',
        promotion: '',
        canSave: false
    });
    const [reqStatus, setReqStatus] = useState('idle');
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const handleComplete = () => {
        setReqStatus('pendind');
        if (state.canSave) {
            if (state.promotion) {
                uniData.sendConfigurations(user.id, {
                    university: state.university,
                    faculty: state.faculty,
                    department: state.department,
                    option: state.option,
                    promotion: state.promotion,
                }).then(res => {
                    if (res.data.status === 'failed') {
                        setReqStatus('idle');
                        setErrors('saving', res.data.message);
                        return console.log(res.data);
                    }

                    dispatch(checkCookie()).then(resp => {
                        if (resp.data.status === 'failed') {
                            return console.log(resp.data);
                        }

                        setReqStatus('idle');
                        props.history.push('/');
                    });
                });
            }

            props.history.push('/');
        }
    };

    const handlePrev = () => {
        setState({
            ...state,
            current: state.current - 1,
            university: '',
            faculty: '',
            department: '',
            option: '',
            promotion: '',
            canSave: 'false'
        });
    };

    const setIsStudent = (value) => {
        setReqStatus('peniding');
        const type = value ? 'student' : 'standard';
        uniData.setAccountType(user.id, type).then(res => {
            if (res.data.status === 'failed') {
                return console.log(res.data);
            }

            setState({
                ...state,
                current: 2,
                isStudent: value,
            });
            setReqStatus('idle');
        });
    };

    const handleInputChange = input => (e) => {
        setState({
            ...state,
            [input]: e.target.value
        });
    };

    const setCanSave = (value) => {
        setState({
            ...state,
            canSave: value
        });
    };

    const renderForm = (current) => {
        switch (current) {
            case 1:
                return (
                    <>
                        {reqStatus === 'pending' ? <CircularProgress /> : null}
                        <FirstForm setIsStudent={setIsStudent} />
                    </>
                )
            case 2:
                if (state.isStudent)
                    return <StudentForm
                        history={props.history}
                        user={user}
                        studentState={state}
                        handleChange={handleInputChange}
                        setCanSave={setCanSave}
                        errors={errors}
                        setErrors={setErrors} />
                return <h2>Simple Form</h2>
        }
    };

    return (
        <NepModal
            title="Configuration"
            body={renderForm(state.current)}
            bodyProps={{ style: { height: 520 } }}
            footer={<ModelFooter handlePrev={handlePrev} canSave={state.canSave} handleComplete={handleComplete} />}
            footerProps={{ style: { display: state.current === 1 ? 'none' : '' } }}
            open={true}
        />
    )
};


const ModelFooter = (props) => {
    const { handlePrev, canSave, handleComplete } = props;
    const nextBtnClasses = nextBtnStyles();
    const simpleBtnClasses = btnStyles();
    return (
        <Grid container>
            <Grid item xs={6}>
                <Button
                    classes={nextBtnClasses}
                    variant="outlined"
                    color="primary"
                    onClick={handlePrev}
                    startIcon={<NavigateBefore />}
                >Precedent</Button>
            </Grid>
            <Grid item xs={6}>
                <Button
                    classes={simpleBtnClasses}
                    variant="contained"
                    color="primary"
                    onClick={handleComplete}
                    style={{ color: "#fff", display: canSave ? '' : 'none' }}
                >Terminer</Button>
            </Grid>
        </Grid>
    )
};

export default Configuration;
