import React from "react";
import {
  Button,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";

/**
 * 
 * @param {import("@material-ui/core").ButtonProps} props
 * @param {Boolean} [props.busy] Whether the button is busy. Default is false.
 */
function BusyButton({
  busy,
  ...props
}) {

  const classes = useStyles();
  return (
    <Button
      variant='contained'
      color='primary'
      disabled={busy}
      className={classes.containerRelative}
      {...props}
    >
      { props.children }
      { !!busy && <CircularProgress size={24} className={classes.buttonProgress} />}
    </Button>
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