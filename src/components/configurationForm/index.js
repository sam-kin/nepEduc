import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@material-ui/core';
import { FormatListBulletedOutlined, NavigateBefore, NavigateNext } from '@material-ui/icons';

import { useSelector, useDispatch } from 'react-redux';

import { getReqStatus, configureUser } from '../../reducers/authSlices';
import { getAllUniversities } from '../../reducers/studentReducers/universitySlices';
import { getFaculties } from '../../reducers/studentReducers/facultySclices';

import NepModal from '../NepModal';
import FirstForm from './FirstForm';
import SecondForm from './SecondForm';
import StudentForm from './StudentForm';
import CircularProgress from '../CircularProgress';

import { nextBtnStyles, btnStyles } from '../../styles/useStyles';

const ConfigurationForm = ({ user }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isStudent, setIsStudent] = useState(false);

    const [isUnset, setIsUnset] = useState(false);
    const [footerDisabled, setFooterDisabled] = useState(true);

    const [studentInfos, setStudentInfos] = useState({
        university: '',
        faculty: '',
        department: '',
        option: '',
        promotion: ''
    });

    const reqStatus = useSelector(getReqStatus);
    const univs = useSelector(getAllUniversities);

    const dispatch = useDispatch();
    const onYes = async () => {
        if (univs.length === 1) {
            setStudentInfos({
                ...studentInfos,
                university: univs[0].id
            });
        }
        await dispatch(configureUser({
            type: 'student'
        }));

        setCurrentStep(currentStep + 1);
        setIsStudent(true);
        setFooterDisabled(false);
    };

    const onNo = () => {
        setCurrentStep(currentStep + 1);
        setIsStudent(false);
        setFooterDisabled(false);
    };

    const renderedForm = (step) => {
        switch (step) {
            case 1:
                return (<FirstForm onYes={onYes} onNo={onNo} />);
            case 2:
                return isStudent ? (<StudentForm
                    setStudentInfos={setStudentInfos}
                    studentInfos={studentInfos}
                    user={user}
                />) : (<SecondForm />);
            default:
                return (<FirstForm />);
        }
    };

    const modalBody = () => (
        <div>
            {reqStatus === 'pending' ? <CircularProgress /> : null}
            {renderedForm(currentStep)}
        </div>
    );

    const modalFooter = () => {
        const nextBtnClasses = nextBtnStyles();
        const simpleBtnClasses = btnStyles();
        return (
            <Grid container>
                <Grid item xs={6}>
                    <Button
                        classes={nextBtnClasses}
                        variant="outlined"
                        color="primary"
                        startIcon={<NavigateBefore />}
                        disabled={footerDisabled}
                    >Precedent</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        classes={simpleBtnClasses}
                        variant="contained"
                        color="primary"
                        style={{ color: "#fff" }}
                        endIcon={<NavigateNext />}
                        disabled={footerDisabled}
                    >{"suivant"}</Button>
                </Grid>
            </Grid>
        )
    }

    useEffect(() => {
        if (user.account.type === 'unset') {
            setIsUnset(true)
        }
    }, [])

    return (
        <div>
            {
                !isUnset ?
                    <NepModal
                        title="configurations"
                        body={modalBody()}
                        footer={modalFooter()}
                        open={true}
                    /> :
                    null
            }
        </div>
    );
};

export default ConfigurationForm;