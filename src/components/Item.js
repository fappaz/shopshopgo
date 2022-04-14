import { IconButton, LinearProgress, ListItem, ListItemText, ListItemSecondaryAction, makeStyles, Typography } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  ticked: {
    backgroundColor: theme.palette.grey[300],
    textDecoration: `line-through ${theme.palette.grey[600]}88`,
    opacity: 0.8,
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
    <>
      <ListItem
        dense
        button
        divider
        onClick={e => {
          if (processing) return;
          onClick(e);
        }}
        className={ ticked ? classes.ticked : null}
      >
        <ListItemText primary={<Typography>{name}</Typography>}/>
        {
          processing ?
            null
          :
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={onDelete}>
                <CloseIcon />
              </IconButton>
            </ListItemSecondaryAction>
        }
      </ListItem>
      {
        processing ?
          <LinearProgress />
        :
          null
      }
    </>
  );
}

export default Item;