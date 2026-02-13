
import { Box, Grid, IconButton, List, Typography } from "@material-ui/core";
import React from "react";
import MainAppBar from "../components/MainAppBar";
import Item from "../components/Item";
import * as ItemsApi from "../api/ItemsApi";
import { useTranslation } from "react-i18next";
import Skeleton from '@material-ui/lab/Skeleton';
import { AuthenticationContext } from "../context/AuthenticationProvider";
import { sortAlphabetically } from "../utils/arrayUtils";
import { useSnackbar } from "notistack";
import BusyButton from "../components/BusyButton";
import CloseIcon from "@material-ui/icons/Close";
import useItems from "../api/items/useItems";

function SkeletonItems ({ quantity = 5, height = 50 } = {}) {
  return (
    <Box my={1}>
      {
        new Array(quantity).fill(height).map((height, index) => (
          <Box key={`key-${index}`} mb={1}>
            <Skeleton variant="rect" height={height} animation="wave" />
          </Box>
        ))
      }
    </Box>
  )
}

export default function ShoppingList() {

  const { account } = React.useContext(AuthenticationContext);
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // const { items, addItem, editItem, removeItem, apiStatus, processingItemIds, deletedItem, setDeletedItem } = ItemsApi.useItems(account?.id);
  const {
    items,
    insert,
    update,
    deleteById,
    apiStatus,
    undo,
  } = useItems({ accountId: account.id});

  const onDuplicateItemAdded = async (itemName, duplicateItem) => await updateItemStatus(duplicateItem, ItemsApi.ItemStatus.pending);

  if (apiStatus === ItemsApi.ApiStatus.loading) {
    return (
      <>
        <MainAppBar />
        <SkeletonItems />
      </>
    );
  }

  const enqueueActionSnackbar = (message, actionHistoryId) => enqueueSnackbar(message, {
    action: snackbarId => (
      <ItemDeletedSnackbar
        onUndo={async () => {
          await undo(actionHistoryId);
          closeSnackbar(snackbarId);
        }}
        onDismiss={() => closeSnackbar(snackbarId)}
      />
    )
  });

  const insertItem = async (item) => {
    const actionHistoryId = await insert(item, true);
    enqueueActionSnackbar(t(`items.snackbar.inserted`), actionHistoryId);
  };

  const updateItemStatus = async (item, status) => {
    const newItem = { ...item, status };
    const actionHistoryId = await update(item.id, newItem, true);
    enqueueActionSnackbar(t(`items.snackbar.updated`), actionHistoryId);
  };

  const toggleItemStatus = async (item) => {
    const newStatus = item.status === ItemsApi.ItemStatus.purchased ? ItemsApi.ItemStatus.pending : ItemsApi.ItemStatus.purchased;
    await updateItemStatus(item, newStatus);
  };

  const deleteItem = async (item) => {
    const actionHistoryId = await deleteById(item.id, true);
    enqueueActionSnackbar(t(`items.snackbar.deleted`), actionHistoryId);
  };
  
  return (
    <>
      <MainAppBar
        onItemAdded={insertItem}
        onDuplicateItemAdded={onDuplicateItemAdded}
        items={items}
      />
      {
        (items||[]).length > 0 ?
          <List>
            {
              []
              .concat(
                items
                  .filter(item => item.status === ItemsApi.ItemStatus.pending)
                  .sort((a,b) => sortAlphabetically(a.name, b.name))
              )
              .concat(
                items
                  .filter(item => item.status === ItemsApi.ItemStatus.purchased)
                  .sort((a, b) => sortAlphabetically(a.name, b.name))
              )
              .map((item, index) => (
                <Item
                  {...item}
                  ticked={item.status === ItemsApi.ItemStatus.purchased}
                  key={`item-${index}`}
                  onClick={() => toggleItemStatus(item)}
                  onDelete={() => deleteItem(item)}
                  // processing={processingItemIds.includes(item.id)}
                />
              ))
            }
          </List>
        :
          <Grid container justifyContent="center">
            <Grid item xs={5}>
              <Box my={6} textAlign="center">
                <Typography>{t('addFirstItem')}</Typography>
              </Box>
            </Grid>
          </Grid>
      }
    </>
  );
}

/**
 * @TODO jsdoc
 * @param {Object} props The props.
 * @returns {import("react").ReactNode}
 */
function ItemDeletedSnackbar({
  onDismiss,
  onUndo,
} = {}) {

  const { t } = useTranslation();

  return (
    <>
      <BusyButton
        variant='text'
        color='secondary'
        onClick={onUndo}
      >
        {t(`undo`)}
      </BusyButton>
      <IconButton
        color='secondary'
        onClick={onDismiss}
      >
        <CloseIcon />
      </IconButton>
    </>
  );

}
