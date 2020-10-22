import React, { useEffect } from 'react';
import {
    Button, Grid, Container
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
    NavigateBefore,
    NavigateNext
} from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { nextBtnStyles, btnStyles } from '../../styles/useStyles';
import FirstRegisterForm from './FirstRegisterForm';
import SecondRegisterForm from './SecondRegisterForm';
import ThirdRegisterForm from './ThirdRegisterForm';
import NepCircularProgress from '../CircularProgress';

import { registerUser, loginUser } from '../../reducers/redux/authSlices';
import { validators } from '../../helpers/userRegisterValidators';

const RegisterForm = (props) => {
    const nextBtnClasses = nextBtnStyles();
    const simpleBtnClasses = btnStyles();

    const initialState = {
        name: '',
        f_name: '',
        l_name: '',
        tel: '',
        username: '',
        birth_date: '',
        password: '',
        confirmPassword: '',
        currentStep: 1,
        confirmCode: '',
        hasConfirmedCode: false,
        errors: {},
        touched: {},
    }

    const [state, setState] = React.useState(initialState);
    const [enableNext, setEnableNext] = React.useState(false);
    const [disablePrev, setDisablePrev] = React.useState(false);
    const [formStatus, setFormStatus] = React.useState('idle');

    const steps = ["fist", "second", "third"];
    const isLastStep = state.currentStep === steps.length;

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Save values in the state
        setState({
            ...state,
            [name]: value,
            touched: {
                ...state.touched,
                [name]: true
            }
        });
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        // remove the error if exist
        const { [name]: removedError, ...rest } = state.errors;

        const error = validators[name](value);

        setState({
            ...state,
            errors: {
                ...rest,
                ...(error && { [name]: state.touched[name] && error })
            }
        });
    };

    const renderCurrentForm = (currentStep) => {
        switch (currentStep) {
            case 1:
                return (
                    <FirstRegisterForm
                        {...{ state, setState, handleChange, handleBlur }}
                    />
                );
            case 2:
                return (
                    <SecondRegisterForm
                        {...{ state, setState, handleChange, handleBlur }}
                    />
                );
            case 3:
                return (
                    <ThirdRegisterForm
                        {...{ state, setState, hasConfirmedCode: state.hasConfirmedCode, setFormStatus }}
                    />
                );
            default:
                return (
                    <FirstRegisterForm
                        {...{ state, setState, handleChange, handleBlur }}
                    />
                );
        }
    };

    const dispatch = useDispatch();
    const canSubmit =
        state.name &&
        state.f_name &&
        state.l_name &&
        state.tel &&
        state.username &&
        state.password &&
        state.confirmPassword === state.password &&
        state.hasConfirmedCode;
    const handleSubmit = async () => {
        setFormStatus('loading')
        if (enableNext) {
            console.log('enableNext')
            if (!isLastStep) {
                console.log('is not last step')

                if (state.currentStep === 2) {
                    console.log('step 2')

                    axios.post("/api/users/sendcode", { username: state.username, tel: state.tel, channel: 'sms' }).then(res => {
                        console.log(res);
                        if (res.data === "pending") {
                            setState({ ...state, currentStep: state.currentStep + 1 });
                        }
                        if (res.data.type === 'validation') {
                            const errors = {};
                            res.data.errors.forEach(error => {
                                errors[error.field] = error.message
                            })
                            console.log(errors);
                            setState({
                                ...state,
                                errors: {
                                    ...state.errors,
                                    ...errors
                                }
                            })
                        }
                        setFormStatus('idle');
                    }).catch(err => {
                        console.log(err);
                        setFormStatus('idle');
                    })
                } else {
                    setState({ ...state, currentStep: state.currentStep + 1 });
                    setFormStatus('idle');
                }
            }

            if (canSubmit) {
                const data = {
                    name: state.name,
                    f_name: state.f_name,
                    l_name: state.l_name,
                    tel: state.tel,
                    birth_date: state.birth_date,
                    username: state.username,
                    password: state.password
                }
                const response = await dispatch(registerUser(data));

                if (response.error) {
                    alert("Une eurreur est survenue lors du traitement. Impossible d'efecuer l'opperation.\nReesseyez apres.")
                }

                await dispatch(loginUser({ username: state.username, password: state.password }))
                setFormStatus('idle');
                props.history.push('/');
            }
        }
    };

    const handleOnBackClick = () => {
        if (state.currentStep === 1) {
            props.history.push("/login");
        } else {
            if (state.hasConfirmedCode) {
                setState(initialState)
                props.history.push('/login')
            };

            setState({ ...state, currentStep: state.currentStep - 1, hasConfirmedCode: false, confirmCode: '' });
        }
    };


    useEffect(() => {
        if (isLastStep)
            axios.post('/api/users/verifycode', { code: state.confirmCode, tel: state.tel }).then(res => {
                if (res.data === 'pending') {
                    setState({
                        ...state,
                        errors: {
                            ...state.errors,
                            ['confirmCode']: "Code de confirmation incorect."
                        }
                    });
                } else {
                    const { confirmCode, ...rest } = state.errors;
                    setState({ ...state, hasConfirmedCode: res.data === 'approved', errors: { ...rest } })
                }
                setFormStatus('idle')
            });
    }, [state.confirmCode]);

    useEffect(() => {

        if (Object.keys(state.errors).length > 0) {
            setEnableNext(false);
            return
        }
        if (state.currentStep === 1) {
            const filled = state.name !== '' && state.f_name !== '' && state.l_name !== '' && state.birth_date !== '';
            setEnableNext(filled)
            return
        }
        if (state.currentStep === 2) {
            const filled =
                state.tel !== '' &&
                state.username !== '' &&
                state.password !== '' &&
                state.confirmPassword === state.password
            setEnableNext(filled)
            return
        }
        if (state.currentStep === 3) {
            setEnableNext(state.hasConfirmedCode);
            return
        }
        if (formStatus === 'loading') {
            setEnableNext(false)
            setDisablePrev(true)
            return
        } else {
            setDisablePrev(false)
        }

    }, [state, formStatus]);

    return (
        <>
            {formStatus === 'loading' ? <NepCircularProgress /> : null}
            <form style={{
                display: 'flex',
                flexDirection: 'column',
                width: 400,
                height: "100%",
            }}>
                <Container
                    style={{
                        height: "420px",
                        overflowY: "auto",
                        overflowX: "hidden",
                        marginTop: "35px",
                        padding: 0,
                        position: "relative"
                    }}
                >
                    {state.currentStep === 3 && state.errors.confirmCode ?
                        <Alert
                            variant="standard"
                            color="error"
                            severity="error"
                            style={{ marginTop: 20 }}
                        >{state.errors.confirmCode}</Alert> : null
                    }
                    {renderCurrentForm(state.currentStep)}
                </Container>
                <Grid container style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    padding: "6px 20px",
                    backgroundColor: "#fff",
                    borderTop: "1px solid rgb(170 170 170 / 17%)"
                }}>
                    <Grid item xs={6}>
                        <Button
                            classes={nextBtnClasses}
                            variant="outlined"
                            color="primary"
                            onClick={handleOnBackClick}
                            startIcon={state.currentStep === 1 ? null : <NavigateBefore />}
                            disabled={formStatus === 'pending'}
                        >{state.currentStep === 1 ? "Connexion" : state.hasConfirmedCode ? "Annuler" : "Precedent"}</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            classes={simpleBtnClasses}
                            variant="contained"
                            color="primary"
                            style={{ color: "#fff" }}
                            endIcon={isLastStep ? null : <NavigateNext />}
                            onClick={handleSubmit}
                            disabled={!enableNext}
                        >{isLastStep ? "Enregistrer" : "suivant"}</Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};


export default RegisterForm;