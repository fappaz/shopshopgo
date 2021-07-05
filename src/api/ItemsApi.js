import React from 'react';
import * as db from '../database/firebase/Items';

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
 * @property {string} id The item unique ID.
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
  
  React.useEffect(function setUpListener() {
    let unsubscribe;
    if (!accountId) return;

    try {
      setStatus(ApiStatus.loading);
      const onChange = (docs) => {
        const items = docs.map(doc => docToItem(doc));
        setItems(items);
        setPendingItems(items.filter(item => item.status === ItemStatus.pending));
        setPurchasedItems(items.filter(item => item.status === ItemStatus.purchased));
      }
      unsubscribe = db.subscribeToItems(accountId, onChange);
      setStatus(ApiStatus.success);
    } catch (error) {
      console.error(`Failed to fetch items. Error:`, error);
      setStatus(ApiStatus.error);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    }
  }, [accountId]);

  const addItem = async (item) => await insert(accountId, item);
  const editItem = async (itemId, item) => await update(accountId, { ...item, id: itemId });
  const removeItem = async (itemId) => await deleteById(accountId, itemId);

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

/**
 * Parse a Firestore document to an Item.
 * @param {firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>} doc The Firestore document. 
 * @returns {Item} The item.
 */
const docToItem = (doc) => {
  if (!doc) return;
  const data = doc.data();
  return { ...data, id: doc.id };
};

/**
 * Find item by its ID.
 * @param {string} accountId The account ID.
 * @param {string} itemId The item ID.
 * @returns {Promise<Item>} A promise with the document found.
 */
export const findById = async (accountId, itemId) => {
  const doc = await db.findById(accountId, itemId);
  return docToItem(doc);
};

/**
 * Insert an item.
 * @param {string} accountId The account ID.
 * @param {Object} item The item.
 * @returns {Promise<Item>} A promise with the item inserted.
 */
export const insert = async (accountId, item) => {
  const doc = await db.insert(accountId, item);
  return docToItem(doc);
};

/**
 * Update an existing record in the database.
 * @param {string} accountId The account ID.
 * @param {Object} item The new data to be assigned to the record.
 * @param {string} item.id The unique ID for the record.
 * @returns {Promise<void>}
 */
export const update = async (accountId, item) => await db.update(accountId, item);

/**
 * Delete an item from the database.
 * @param {string} accountId The account ID.
 * @param {string} itemId The item ID
 * @returns {Promise<void>}
 */
export const deleteById = async (accountId, itemId) => await db.deleteById(accountId, itemId);

export const testable = {
  docToItem,
};