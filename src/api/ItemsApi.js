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
 * @property {string} apiStatus The API request status, which should be one of the ApiStatus values.
 * @property {string[]} processingItemIds An array with the IDs of items that are being processed/edited.
 */

/**
 * 
 * @param {string} accountId The account ID.
 * @returns {UseItemsReturn}
 */
export const useItems = (accountId) => {

  const [items, setItems] = React.useState([]);
  const [apiStatus, setApiStatus] = React.useState(ApiStatus.loading);
  const [processingItemIds, setProcessingItemIds] = React.useState([]);
  
  React.useEffect(function setUpListener() {
    let unsubscribe;
    if (!accountId) return;

    try {
      const onChange = (docs, changes) => {
        
        const items = docs.map(doc => docToItem(doc));
        setItems(items);
        
        setApiStatus(ApiStatus.success);

        const modifiedItemIds = changes.filter(change => change.type === "modified").map(change => change.doc.data().id);
        setProcessingItemIds(processingItemIds => processingItemIds.filter(itemId => modifiedItemIds.includes(itemId)));
      };
      unsubscribe = db.subscribeToItems(accountId, onChange);
    } catch (error) {
      console.error(`Failed to fetch items. Error:`, error);
      setApiStatus(ApiStatus.error);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [accountId]);

  const addItem = async (item) => await insert(accountId, item);

  const editItem = async (itemId, item) => {
    setProcessingItemIds(previousState => [...previousState, item.id]);
    await update(accountId, { ...item, id: itemId });
  };

  const removeItem = async (itemId) => {
    setProcessingItemIds(previousState => [...previousState, itemId]);
    await deleteById(accountId, itemId);
  };

  return {
    items,
    addItem,
    editItem,
    removeItem,
    apiStatus,
    processingItemIds,
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
 * @param {Item} item The item.
 * @returns {Promise<Item>} A promise with the item inserted.
 */
export const insert = async (accountId, item) => {
  const doc = await db.insert(accountId, item);
  return docToItem(doc);
};

/**
 * Update an existing record in the database.
 * @param {string} accountId The account ID.
 * @param {Item} item The new data to be assigned to the record.
 * @returns {Promise<void>}
 */
export const update = async (accountId, item) => await db.update(accountId, item);

/**
 * Delete an item from the database.
 * @param {string} accountId The account ID.
 * @param {string} itemId The item ID.
 * @returns {Promise<void>}
 */
export const deleteById = async (accountId, itemId) => await db.deleteById(accountId, itemId);

export const testable = {
  docToItem,
};