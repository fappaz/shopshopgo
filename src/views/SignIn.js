import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import {
  Avatar,
  Box,
  Fade,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import BusyButton from "../components/BusyButton";
import { useTranslation } from 'react-i18next';
import { AuthenticationContext } from '../context/AuthenticationProvider';
import * as AccountApi from '../api/AccountApi';

function SignIn() {

  const { account } = React.useContext(AuthenticationContext);
	const { clearErrors, control, handleSubmit, setError } = useForm();
  const [busyButtons, setBusyButtons] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  const formFields = {
    email: {
      inputProps: {
        id: "email",
        name: "email",
        label: t("email"),
        type: "email",
        autoComplete: "email",
        autoFocus: true,
      },
      validationRules: {
        required: t('formErrorRequiredField'),
        maxLength: 140,
      },
    },
    password: {
      inputProps: {
        id: "password",
        name: "password",
        label: t("password"),
        type: "password",
        autoComplete: "current-password",
      },
      validationRules: {
        required: t('formErrorRequiredField'),
        maxLength: 32,
      },
    },
  };

  React.useEffect(function showListOnAccountAuthenticated() {
    if (!account) return;
    history.push("/list");
  }, [account, history]);

  const onSubmit = async (formData) => {
    console.log(formData)
    setBusyButtons(true);
    try {
      clearErrors();
      const { email, password } = formData;
      await AccountApi.signIn(email, password);
      history.push("/list");
    } catch (error) {
      console.error(`Failed to sign in:`, error);
      const knownErrors = {
        "auth/invalid-email": {
          message: t('formErrorInvalidEmail'),
          fieldId: 'email'  
        },
        "auth/wrong-password": {
          message: t('formErrorCredentialsNotMatching'),
          fieldId: 'password'  
        },
        "auth/user-not-found": {
          message: t('formErrorCredentialsNotMatching'),
          fieldId: 'password'
        },
        fallback: {
          message: t('formErrorSystemUnavailable'),
          fieldId: 'password'
        }
      };
      const errorDetails = knownErrors[error.code] || knownErrors.fallback;
      setError(errorDetails.field, { message: errorDetails.message, type: "manua" });
    } finally {
      setBusyButtons(false);
    }
  };

  const Header = () => {
    return (
      <Box mb={3}>
        <Grid container align='center' justify='center' spacing={0}>
          <Grid item xs={12}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          </Grid>
        
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">{t('signIn')}</Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const Fields = () => {
    return (
      <Box>
        <Grid container justify='center' spacing={2}>
          {
            [formFields.email, formFields.password].map((field) => (
              <Grid item key={`grid-${field.inputProps.id}`} xs={12}>
                <Controller
                  name={field.inputProps.id}
                  control={control}
                  rules={field.validationRules}
                  render={({
                    field: { ref, ...fieldProps },
                    fieldState: { error }
                  }) => (
                    <TextField
                      variant="outlined"
                      error={!!error}
                      helperText={error?.message}
                      fullWidth
                      {...field.inputProps}
                      {...fieldProps}
                    />
                  )}
                />
              </Grid>
            ))
          }
        </Grid>
      </Box>
    );
  };

  const Buttons = () => {
    return (
      <Box mb={2}>
        <Grid container justify='center' spacing={2}>
          <Grid item xs={12}>
            <BusyButton busy={busyButtons} type='submit' fullWidth>
              {t('signIn')}
            </BusyButton>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Box mt={6}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fade in timeout={1200}>
          <Grid container direction='column' justify='center' alignItems='center' >
            <Grid item xs={8} sm={5} md={4} lg={3}>
              <Grid container alignItems='center' justify='center' spacing={2}>
                <Grid item xs={12}>{ Header() }</Grid>
                <Grid item xs={12}>{ Fields() }</Grid>
                <Grid item xs={12}>{ Buttons() }</Grid>
              </Grid>
            </Grid>
          </Grid>
        </Fade>
      </form>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  disabledAvatar: {
    opacity: 0.5,
  },
  smallAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default SignIn;