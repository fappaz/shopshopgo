import React from "react";
import {
  Button,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";

/**
 * 
 * @param {Object} props
 * @param {Boolean} [props.busy] Whether the button is busy. Default is false.
 * @param {Button.props} [props.buttonProps] Props for the Button component.
 */
function BusyButton({
  busy,
  ...props
}) {

  const classes = useStyles();
  return (
    <div className={classes.containerRelative}>
      <Button
        variant='contained'
        color='primary'
        disabled={busy}
        {...props}
      >
        { props.children }
        {busy && <CircularProgress size={24} className={classes.buttonProgress} />}
      </Button>
    </div>
  );

};

const useStyles = makeStyles(theme => ({
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  containerRelative: {
    position: 'relative',
  },
}));

export default BusyButton;