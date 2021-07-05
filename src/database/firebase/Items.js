import { firestore } from "./FirebaseConfig";

/**
 * Find record on Firestore by its ID.
 * @param {string} accountId The account ID.
 * @param {string} itemId The item ID.
 * @returns {Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>>} A promise with the document found.
 */
export const findById = async (accountId, itemId) => await firestore.doc(`accounts/${accountId}/apps/shopshop/items/${itemId}`).get();

/**
 * 
 * @param {string} accountId The account ID.
 * @param {Function} onChange Function to be called when a change happens.
 * @returns {Function} An unsubscribe function.
 */
export const subscribeToItems = (accountId, onChange) => {
  const path = `accounts/${accountId}/apps/shopshop/items`;
  return firestore
    .collection(path)
    .onSnapshot(snapshot => {
      onChange(snapshot.docs);
    });
};


/**
 * Insert a record to the database.
 * @param {string} accountId The account ID.
 * @param {Object} item The item.
 * @returns {Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>>} A promise with the document inserted.
 */
 export const insert = async (accountId, item) => {
  const doc = firestore.collection(`accounts/${accountId}/apps/shopshop/items`).doc();
  await doc.set(item);
  return await doc.get();
};

/**
 * Update an existing record in the database.
 * @param {string} accountId The account ID.
 * @param {Object} item The new data to be assigned to the record.
 * @param {string} item.id The unique ID for the record.
 * @param {Object} options Update options.
 * @param {Boolean} options.merge Whether the new item data should be merged to the existing one (default), or override it completely.
 * @returns {Promise<void>}
 */
 export const update = async (accountId, item, { merge = true } = {}) => {
  let itemId = item.id;
  delete item.id;
  await firestore.doc(`accounts/${accountId}/apps/shopshop/items/${itemId}`).set(item, { merge });
};

/**
 * Delete an item from the database.
 * @param {string} accountId The account ID.
 * @param {string} itemId The item ID
 * @returns {Promise<void>}
 */
export const deleteById = async (accountId, itemId) => {
  await firestore.doc(`accounts/${accountId}/apps/shopshop/items/${itemId}`).delete();
};