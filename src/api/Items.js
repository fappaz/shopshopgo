import React from 'react';
import * as ApiUtils from './ApiUtils';

export const ApiStatus = {
  loading: "loading",
  success: "success",
  error: "error",
};

export const ItemStatus = {
  pending: "pending",
  purchased: "purchased",
};

/**
 * @typedef Item
 * @property {string} name The item name.
 * @property {string} status The item status, which is one of the ItemStatus values.
 */

/**
 * @typedef UseItemsReturn
 * @property {Item[]} items An array of items.
 * @property {Item[]} pendingItems An array of items which status is pending.
 * @property {Item[]} purchasedItems An array of items which status is purchased.
 * @property {Function} addItem The function to add an item to the pending list.
 * @property {Function} editItem The function to edit an existing item in the list.
 * @property {Function} removeItem The function to remove an item from the list.
 * @property {string} status The API request status, which is one of the ApiStatus values.
 */

/**
 * 
 * @param {string} accountId The account ID.
 * @returns {UseItemsReturn}
 */
export const useItems = (accountId) => {

  const [items, setItems] = React.useState([]);
  const [pendingItems, setPendingItems] = React.useState([]);
  const [purchasedItems, setPurchasedItems] = React.useState([]);
  const [status, setStatus] = React.useState(ApiStatus.loading);
  
  React.useEffect(function fetchItems() {

    /** @TODO fetch from API */
    (async function getItems() {
      try {
        setStatus(ApiStatus.loading);
        await ApiUtils.sleep(2500);
        setItems([
          { name: "Bread", status: ItemStatus.pending },
          { name: "Milk", status: ItemStatus.pending },
          { name: "Potato", status: ItemStatus.purchased },
        ]);
        setStatus(ApiStatus.success);
      } catch (error) {
        console.error(`Failed to fetch items. Error:`, error);
        setStatus(ApiStatus.error);
      }
    })();

  }, [accountId]);

  React.useEffect(function updateItemsStatus() {
    setPendingItems(items.filter(item => item.status === ItemStatus.pending));
    setPurchasedItems(items.filter(item => item.status === ItemStatus.purchased));
  }, [items]);

  const editItem = async (itemName, newValue) => {
    let newItems = getItemsAfterRemoval(items, itemName);
    newItems = getItemsAfterInsertion(newItems, newValue);
    setItems(newItems);
  };

  const removeItem = async (itemName) => {
    setItems(getItemsAfterRemoval(items, itemName));
  };

  const addItem = async (item) => {
    editItem(item.name, item);
  };

  return {
    items,
    pendingItems,
    purchasedItems,
    addItem,
    editItem,
    removeItem,
    status,
  };
};

const getComparableString = (string) => string.trim().toLocaleLowerCase();
const getItemsAfterRemoval = (items, itemNameToRemove) => itemNameToRemove ? items.filter(item => getComparableString(item.name) !== getComparableString(itemNameToRemove)) : items;
const getItemsAfterInsertion = (items, itemToInsert) => itemToInsert ? [...items, itemToInsert] : items;