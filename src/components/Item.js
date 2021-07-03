import { Typography } from "@material-ui/core";
import { Checkbox, ListItem, ListItemIcon, ListItemText,ListItemSecondaryAction,IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';


/**
 *
 * @param {Object} props The component props.
 * @param {string} props.name The item name.
 * @param {string} props.status The item status.
 * @param {Function} props.onClick The function to be called when the item is clicked on.
 * @param {Function} props.onDelete The function to be called when the delete button is clicked on for this item.
 * @returns 
 */
function Item({
  name,
  status = "pending",
  onClick,
  onDelete,
} = {}) {

  return (
    <ListItem dense button onClick={onClick} divider>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={status === "purchased"}
          tabIndex={-1}
          disableRipple
          color="primary"
        />
      </ListItemIcon>
      <ListItemText primary={<Typography style={{ textDecorationLine: status === "pending" ? "none" : "line-through" }}>{name}</Typography>}/>
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={onDelete}>
          <CloseIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Item;