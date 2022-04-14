
import { Box, Grid, List, Typography } from "@material-ui/core";
import React from "react";
import MainAppBar from "../components/MainAppBar";
import Item from "../components/Item";
import * as ItemsApi from "../api/ItemsApi";
import { useTranslation } from "react-i18next";
import Skeleton from '@material-ui/lab/Skeleton';
import { AuthenticationContext } from "../context/AuthenticationProvider";
import { sortAlphabetically } from "../utils/arrayUtils";

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

function ShoppingList() {

  const { account } = React.useContext(AuthenticationContext);
  const { t } = useTranslation();

  const { items, addItem, editItem, removeItem, apiStatus, processingItemIds } = ItemsApi.useItems(account?.id);

  const onDuplicateItemAdded = (itemName, duplicateItem) => {
    const { id, ...data } = duplicateItem;
    editItem(id, { ...data, status: ItemsApi.ItemStatus.pending });
  }

  if (apiStatus === ItemsApi.ApiStatus.loading) {
    return (
      <>
        <MainAppBar />
        <SkeletonItems />
      </>
    );
  }

  return (
    <>
      <MainAppBar
        onItemAdded={addItem}
        onDuplicateItemAdded={onDuplicateItemAdded}
        items={items}
      />
      {
        items.length > 0 ?
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
                  ticked={item.status === "purchased"}
                  key={`item-${index}`}
                  onClick={() => editItem(item.id, { ...item, status: item.status === ItemsApi.ItemStatus.purchased ? ItemsApi.ItemStatus.pending : ItemsApi.ItemStatus.purchased })}
                  onDelete={() => removeItem(item.id)}
                  processing={processingItemIds.includes(item.id)}
                />
              ))
            }
          </List>
        :
          <Grid container justify="center">
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

export default ShoppingList;