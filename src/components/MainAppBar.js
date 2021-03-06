import React, { useEffect } from "react";
import { AppBar, Divider, InputBase, makeStyles, Menu, MenuItem, Toolbar, Typography, IconButton, Zoom } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { AuthenticationContext } from "../context/AuthenticationProvider";
import * as AccountApi from "../api/AccountApi";
import Autocomplete from "./Autocomplete";
import { sortAlphabetically } from "../utils/arrayUtils";
import { useSnackbar } from "notistack";
import { alpha } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    overflow: 'inherit',
  },
  itemField: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: '100%',
    margin: theme.spacing(0, 1, 0, 2),
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    width: '100%',
  },
}));

/**
 *
 * @param {Object} props The component props.
 * @param {Item[]} [props.items] An array of items, for autocomplete options.
 * @param {Function} [props.onItemAdded] The function to be called when an item is added to the list. If none is provided, the form remain be hidden.
 * @param {Function} [props.onDuplicateItemAdded] The function to be called when adding an item that already exists.
 * @returns {JSX.Element}
 */
function MainAppBar({
  items = [],
  onItemAdded,
  onDuplicateItemAdded,
} = {}) {

  const { t } = useTranslation();
  const classes = useStyles();
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = React.useState(null);
  const isProfileMenuOpen = Boolean(profileMenuAnchorEl);
  const [autocompleteOptions, setAutocompleteOptions] = React.useState([]);
  const { account } = React.useContext(AuthenticationContext);
  const { enqueueSnackbar } = useSnackbar();
  
  useEffect(function updateOptions() {
    setAutocompleteOptions(items.map(i=>i.name).sort((a, b) => sortAlphabetically(a, b)));
  }, [items]);


  const onSubmit = async (event, itemName) => {
    try {
      if (!itemName || !onItemAdded) return;

      const duplicateItem = items.find(item => item.name.toLocaleLowerCase() === itemName.toLocaleLowerCase() );
      if (Boolean(duplicateItem)) {
        await onDuplicateItemAdded(itemName, duplicateItem);
      } else {
        await onItemAdded({ name: itemName, status: "pending" });
      }
      
    } catch (error) {
      console.error(`Failed to add item. Reason:`, error);
      enqueueSnackbar(t(`items.errors.failedToAdd`), { variant: 'error' });
    }
  };

  const closeProfileMenu = () => setProfileMenuAnchorEl(null);

  const signOut = async () => {
    try {
      await AccountApi.signOut();
      closeProfileMenu();
    } catch (error) {
      console.error(`Failed to sign out`, error);
    }
  };

  return (
    <div className={classes.root}>

      <AppBar position="fixed">
        <Toolbar>

          <Typography variant="h6" noWrap className={classes.title}>{t("appName")}</Typography>

          <Zoom in={!!onItemAdded}>
            <div className={classes.itemField}>
              <Autocomplete
                freeSolo
                options={autocompleteOptions}
                onChange={onSubmit}
                renderInput={(props) => {
                  /** 
                   * The props need to be deconstructed this way because:
                   * - InputLabelProps must be ignored so it won't add an unwanted label to the InputBase
                   * - InputProps must be set to the InputBase before the rest of props, so the autocomplete select box will be displayed properly
                   */
                  const { InputLabelProps, InputProps, ...rest} = props;
                  return (
                    <InputBase
                      {...InputProps}
                      {...rest}
                      placeholder={t("textFieldItemName")}
                      variant="filled"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                    />
                  )
                }}
              />
            </div>
          </Zoom>

          <IconButton
            edge="end"
            color="inherit"
            onClick={e => setProfileMenuAnchorEl(e.currentTarget)}
          >
            <AccountCircle />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={profileMenuAnchorEl}
            keepMounted
            open={isProfileMenuOpen}
            onClose={closeProfileMenu}
          >
            <MenuItem disabled>{account?.email}</MenuItem>
            <Divider />
            <MenuItem onClick={signOut}>{t('signOut')}</MenuItem>
          </Menu>

        </Toolbar>
      </AppBar>

      {/**
       * This "empty" toolbar fixes a known issue with fixed AppBar.
       * See https://material-ui.com/components/app-bar/#fixed-placement
       * */}
      <Toolbar />
    </div>
  );
}

export default MainAppBar;