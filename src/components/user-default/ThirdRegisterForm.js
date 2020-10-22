import React, {useRef, useEffect} from 'react';
import {
    Grid,
    Button,
    Typography
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyle = makeStyles({
    main: {
        padding: "30px 0",
        textAlign: "center",
        color: "#333333c7"
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
        padding: "10px 0"
    },
    field: {
        textAlign: "center"
    },
    input: {
        textAlign: "center",
        fontSize: 17,
        padding: "2px 0",
        border: "none",
        borderBottom: "2px solid #aaa",
        margin: 5,
        outline: "none",
        color: "#333333c7"
    }
});

const ThirdRegisterForm = ({state, setState, setFormStatus, hasConfirmedCode}) => {
    const classes = useStyle();
    const [codeState, setCodeState] = React.useState({
        val1: '',
        val2: '',
        val3: '',
        val4: '',
        val5: '',
        val6: ''
    });
    
    const inputRefs = {
        input1: useRef(null),
        input2: useRef(null),
        input3: useRef(null),
        input4: useRef(null),
        input5: useRef(null),
        input6: useRef(null),        
    };

    const handleKeyDown = (e) => {
        const code = e.keyCode;
        if ((code < 48 || code > 57) && code !== 9 && code !== 8) {
            e.preventDefault();
            return false;
        }
        return true;
    };

    const handleKeyUp = (e, field) => {
        const code = e.keyCode;

        if (code === 8) {
            let prev = field.current.previousSibling;
            if (!prev) return;
            prev.focus();
        }

        if (code === 9) return true;

        if (code >= 48 && code <= 57) {
            let next = field.current.nextSibling;
            if (!next) return;
            next.focus();
        }

        return false;
    };

    useEffect(() => {
        inputRefs.input1.current.focus();
    }, [inputRefs.input1]);

    useEffect(() => {
        handleComplete();
    }, [codeState]);

    const handleComplete = () => {
        if (codeState.val1 !=='' && codeState.val2 !=='' && codeState.val4 !=='' && codeState.val3 !=='' && codeState.val5 !=='' && codeState.val6 !=='') {
            console.log('complete');
            const completeCode = codeState.val1 + codeState.val2 + codeState.val3 + codeState.val4 + codeState.val5 + codeState.val6;
            setState({...state, confirmCode: completeCode});
            setFormStatus('loading');
        }
        console.log('uncomplete');
    };
    return (
        <>
            <Grid container className={classes.main}>
                {hasConfirmedCode ?
                    <div 
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItem: "center"
                        }}
                    > 
                        <Typography variant="body1">Verification du numero de telephone avec succes.</Typography>
                        <Typography 
                            variant="body2"
                            style={{marginTop: "40px", width: '100%', textAlign: 'center'}}
                        >Cliquez sur le bouton enregistrer pour finir.</Typography> 
                    </div> :
                    <>
                        <Grid item xs={12}>
                            <Typography variant="body1">Verification du numero de telephone.</Typography>
                        </Grid>
                
                        <Grid item xs={12} container style={{marginTop: 20}}>
                    
                            <Grid item xs={12}>
                                <Typography variant="h5" align="center">Code</Typography>
                            </Grid>
                            <Grid item xs={12} container className={classes.centered}>
                                {['val1', 'val2', 'val3', 'val4', 'val5', 'val6'].map((item, index) => (
                                    <input 
                                        key={item}
                                        type="text"
                                        value={codeState[item]}
                                        onChange={(e) => setCodeState({...codeState, [item]: e.target.value})}
                                        onKeyDown={(e) => handleKeyDown(e)}
                                        onKeyUp={(e) => handleKeyUp(e, Object.values(inputRefs)[index])}
                                        maxLength="1"
                                        size="1"
                                        min="0"
                                        max="9"
                                        pattern="[0-9]{1}"
                                        className={classes.input}
                                        ref={Object.values(inputRefs)[index]}
                                    />
                                ))}                        
                            </Grid>
                        </Grid>
                
                        <Grid item xs={12} container className={classes.centered} style={{marginTop: 40, flexDirection:"column"}}>
                            <Typography variant="body2">Vous n'avez pas recu le code ?</Typography>
                            <Button variant="text" color="primary"
                                style={{
                                    textTransform: "capitalize",
                                    margin: 10
                                }}                    
                            >Envoyer un nouveau code</Button>
                            <Button variant="text" color="primary"
                                style={{
                                    textTransform: "capitalize",
                                }}                    
                            >Changer le numero de telephone</Button>
                        </Grid>
                    </>
                }
            </Grid>
        </>
    )
};

export default ThirdRegisterForm;