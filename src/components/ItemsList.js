import { List } from "@material-ui/core";
import Item from "./Item";

/**
 *
 * @param {Object} props The component props.
 * @param {Object[]} props.items The items to be displayed.
 * @param {Function} props.onClick The function to be called when an item is clicked on.
 * @param {Function} props.onDelete The function to be called when the delete button is clicked on for an item.
 * @returns 
 */
function ItemsList({
  items,
  onClick,
  onDelete,
} = {}) {

  return (
    <List>
      {
        items.map((item, index) => (
          <Item
            key={`item-${index}`}
            {...item}
            onClick={() => onClick(item)}
            onDelete={() => onDelete(item)}
          />
        ))
      }
    </List>
  );
}

export default ItemsList;