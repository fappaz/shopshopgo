import { IconButton, LinearProgress, ListItem, ListItemText, ListItemSecondaryAction, makeStyles, Typography, Divider } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

const useStyles = makeStyles(theme => ({
  ticked: {
    backgroundColor: theme.palette.grey[400],
    textDecoration: `line-through ${theme.palette.grey[800]}aa`,
    opacity: 0.9,
  },
  opaque: {
    opacity: 0,
  }
}));

/**
 *
 * @param {Object} props The component props.
 * @param {string} props.id The item unique ID.
 * @param {string} props.name The item name.
 * @param {string} props.status The item status.
 * @param {Function} props.onClick The function to be called when the item is clicked on.
 * @param {Function} props.onDelete The function to be called when the delete button is clicked on for this item.
 * @param {Boolean} props.processing Whether this item is being processed (e.g.: being edited).
 * @returns 
 */
function Item({
  id,
  name,
  ticked,
  onClick,
  onDelete,
  processing,
} = {}) {

  const classes = useStyles();

  return (
    <div className={ticked ? classes.ticked : null}>
      <ListItem
        button
        onClick={(e) => {
          if (processing) return;
          onClick(e);
        }}
      >
        <ListItemText primary={<Typography>{name}</Typography>}/>
        {
          !processing &&
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={onDelete}>
                <CloseIcon />
              </IconButton>
            </ListItemSecondaryAction>
        }
      </ListItem>
      <LinearProgress className={ processing ? null : classes.opaque } />
      <Divider />
    </div>
  );
}

export default Item;