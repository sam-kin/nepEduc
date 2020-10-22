import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyleCircularProgress = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  top: {
    color: '#1a90ff',
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

function NepCircularProgress(props) {
  const classes = useStyleCircularProgress();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </div>
  );
}

const nepProgressStyles = makeStyles({
  root: {
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    display: "flex",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(0 0 0 / 6%)",
    zIndex: 1
  },
  container: {
    width: "65px",
    height: "65px",
    backgroundColor: "#fff",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '1px 1px 20px #000000a8'
  }
})

export default () => {
  const classes = nepProgressStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <NepCircularProgress />
      </div>
    </div>
  )
};
