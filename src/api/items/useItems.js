import React, { useRef } from "react";
import { ApiStatus, deleteById, docToItem, insert, update } from "../ItemsApi";
import * as db from '../../database/firebase/Items';
import { v4 as uuidv4 } from 'uuid';

/**
 * @TODO jsdoc
 * @param {Object} props The props.
 * @returns {import("react").ReactNode}
 */
export default function useItems({
  accountId,
  items = [],
  apiStatus = ApiStatus.loading,
  actionsHistory = [],
  historyLength = 1,
} = {}) {

  const [_items, setItems] = React.useState(items);
  const [_apiStatus, setApiStatus] = React.useState(apiStatus);
  const actionsHistoryRef = useRef(actionsHistory);

  React.useEffect(function setupListener() {
    let unsubscribe;
    if (!accountId) return;

    try {
      setApiStatus(ApiStatus.success);
      const onItemsChange = (docs, changes) => {
        const items = docs.map(doc => docToItem(doc));
        setItems(items);
        setApiStatus(ApiStatus.success);

        /** @TODO update status of items if they are being modified */
      };

      unsubscribe = db.subscribeToItems(accountId, onItemsChange);
    } catch (error) {
      console.error(`Failed to listen to items. Reason:`, error);
      setApiStatus(ApiStatus.error);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    }
  }, [accountId]);

  /**
   * 
   * @param {Function} undo Callback for the undo action
   */
  const appendToActionHistory = (undo) => {
    const action = { id: uuidv4(), undo };
    actionsHistoryRef.current.splice(-1 * historyLength, historyLength);
    actionsHistoryRef.current.push(action);
    console.log(`@TODO ### generated action id: `, action.id);
    return action.id;
  };

  const insertItem = async (item, shouldAppendToActionHistory) => {
    const itemInserted = await insert(accountId, item);
    
    if (!shouldAppendToActionHistory) return null;
    
    const undo = async () => await deletedItem(itemInserted.id, false);
    return appendToActionHistory(undo);
  };

  const updateItem = async (id, item, shouldAppendToActionHistory) => {
    const oldItem = { ...item };
    const undo = async () => await updateItem(id, oldItem, false);
    await update(accountId, { ...item, id });

    if (!shouldAppendToActionHistory) return null;

    return appendToActionHistory(undo);
  };

  const deletedItem = async (id, shouldAppendToActionHistory) => {
    const oldItem = _items.find(item => item.id === id);
    await deleteById(accountId, id);

    if (!shouldAppendToActionHistory || !oldItem) return null;

    const undo = async () => await insertItem(oldItem);
    return appendToActionHistory(undo);
  };

  const undo = async (actionId) => {
    console.log(`@TODO ### undoing "${actionId}" from: `, JSON.stringify(actionsHistoryRef.current));
    const action = actionsHistoryRef.current.find(action => action.id === actionId);
    if (!action || typeof action.undo !== 'function') return;
    
    /** @TODO this is not working! */
    await action.undo();
    actionsHistoryRef.current = actionsHistoryRef.current.filter(action => action.id !== actionId);
  };

  return {
    items: _items,
    insert: insertItem,
    update: updateItem,
    deleteById: deletedItem,
    apiStatus: _apiStatus,
    undo,
  };

}