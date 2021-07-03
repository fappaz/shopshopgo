
import { Box, Divider, Grid, makeStyles, Paper, ThemeProvider, Typography, useTheme } from "@material-ui/core";
import React from "react";
import MainAppBar from "../components/MainAppBar";
import ItemsList from "../components/ItemsList";
import * as ItemsApi from "../api/Items";
import { useTranslation } from "react-i18next";
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  opaque: {
    opacity: 0.6,
  },
}));

function SkeletonItems ({ quantity = 4, height = 50 } = {}) {
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

  const { t } = useTranslation();
  const classes = useStyles();
  const mainTheme = useTheme();
  const purchasedTheme = {
    ...mainTheme,
    palette: {
      ...mainTheme.palette,
      type: 'dark',
      text: {
        ...mainTheme.palette.text,
        primary: '#fff',
        icon: 'rgba(255, 255, 255, 0.5)',
      },
      divider: 'rgba(255, 255, 255, 0.12)',
      background: {
        paper: '#424242',
        default: '#303030',
      },
      action: {
        ...mainTheme.palette.action,
        active: '#fff',
        selected: 'rgba(255, 255, 255, 0.16)',
      },
    },
    shape: {
      borderRadius: 0,
    }
  };

  const { items, pendingItems, purchasedItems, addItem, editItem, removeItem, status } = ItemsApi.useItems();

  if (status === ItemsApi.ApiStatus.loading) {
    return (
      <>
        <MainAppBar />
        <SkeletonItems />
      </>
    );
  }

  return (
    <>
      <MainAppBar onItemAdded={addItem} />
      {
        items.length > 0 ?
          <ItemsList
            items={pendingItems.sort((a, b) => a.name.localeCompare(b.name))}
            onClick={(item) => editItem(item.name, { ...item, status: ItemsApi.ItemStatus.purchased })}
            onDelete={(item) => removeItem(item.name)}
          />
        :
          <Grid container justify="center">
            <Grid item xs={5}>
              <Box my={6} textAlign="center">
                <Typography>{t('addFirstItem')}</Typography>
              </Box>
            </Grid>
          </Grid>
      }

      <Box mt={2} mx={2}>
        <Typography variant="overline">
            {t("purchasedItems")}
        </Typography>
      </Box>
      <Divider />

      {
        purchasedItems.length > 0 ?
          <>
            <ThemeProvider theme={purchasedTheme}>
              <Paper>
                <ItemsList
                  items={purchasedItems.sort((a, b) => a.name.localeCompare(b.name))}
                  onClick={(item) => editItem(item.name, { ...item, status: ItemsApi.ItemStatus.pending })}
                  onDelete={(item) => removeItem(item.name)}
                />
              </Paper>
            </ThemeProvider>
          </>
        :
        <Box mx={3} mt={2}>
          <Typography variant="body2" className={classes.opaque}>
              {t("empty")}
          </Typography>
        </Box>
      }
    </>
  );
}

export default ShoppingList;