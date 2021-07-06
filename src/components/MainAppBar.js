import React from "react";
import { AppBar, Divider, fade, InputBase, makeStyles, Menu, MenuItem, Toolbar, Typography, IconButton, Zoom } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Controller, useForm } from 'react-hook-form';
import { AuthenticationContext } from "../context/AuthenticationProvider";
import * as AccountApi from "../api/AccountApi";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1
  },
  itemField: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: 'auto',
		margin: theme.spacing(0, 1, 0, 1),
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
 * @param {Function} [props.onItemAdded] The function to be called when an item is added to the list. If none is provided, the form remain be hidden.
 * @returns 
 */
function MainAppBar({
	onItemAdded
} = {}) {

	const { t } = useTranslation();
	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			itemName: ''
		}
	});
	const classes = useStyles();
	const [profileMenuAnchorEl, setProfileMenuAnchorEl] = React.useState(null);
	const isProfileMenuOpen = Boolean(profileMenuAnchorEl);
	const { account } = React.useContext(AuthenticationContext);

	const onSubmit = (formData) => {
    const { itemName } = formData;
    if (!itemName || !onItemAdded) return;
    onItemAdded({ name: itemName, status: "pending" });
    reset({ itemName: '' });
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
							<form onSubmit={handleSubmit(onSubmit)}>
								<Controller
									control={control}
									name="itemName"
									render={({
										field: { ref, ...fieldProps }
									}) => (
										<InputBase
											id={fieldProps.name}
											placeholder={t("textFieldItemName")}
											variant="filled"
											classes={{
												root: classes.inputRoot,
												input: classes.inputInput,
											}}
											
											{...fieldProps}
										/>
									)}
								/>
							</form>
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