import React from "react";
import {
  makeStyles,
} from "@material-ui/core";

function VerticalCenter(props) {
  const classes = useStyles();
  return (
    <div className={classes.centerParent}>
      {props.children}
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  centerParent: {
    // height: "100vh",
    padding: '50% 0%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
}));

export default VerticalCenter;