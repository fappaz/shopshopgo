import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({ lng: 'en' });

export const setupI18N = async (languages, selectedLanguage = 'en-NZ') => {
  // console.debug(`Setting up i18n module for "${selectedLanguage}" language...`, languages);
  await i18n.init({
    resources: languages,
    lng: selectedLanguage,
  });
};

export const defaultLanguages = {
  "en-NZ": {
    "translation": {
      "addFirstItem": "Add your first item on the text box above",
      "allRightsReserved": "© Fernando Paz 2021 • All Rights Reserved",
      "appName": "shopshop",
      "back": "Back",
      "cancel": "Cancel",
      "close": "Close",
      "confirm": "Confirm",
      "createdAt": "Created at {{- timestamp}}",
      "dateAndTimeLongFormat": "dd/MM/yyyy HH:mm",
      "dateAndTimeShortFormat": "dd/MM HH:mm",
      "delete": "Delete",
      "deleteEntriesDialogTitle": "Delete {{quantity}} entries?",
      "deleteSelectedEntries": "Delete selected entries",
      "deleteSelectedEntriesDialogMessage": "Confirm the operation by typing the quantity of entries selected ({{- confirmationText}}):",
      "dismiss": "Dismiss",
      "edit": "Edit",
      "ellipsis": "...",
      "email": "Email",
      "empty": "Empty",
      "errorDeleteEntry": "Failed to delete entry, please try again",
      "errorInvalidCredentials": "The password is invalid or the user does not exist",
      "errorInvalidEmail": "Please provide a valid email address",
      "errorSystemUnavailable": "System is unavailable, please try again later",
      "errorValueAlreadyInUse": "This value is already being used, please enter another.",
      "filter": "Filter",
      "formErrorInvalidEmail": "Please enter a valid email address.",
      "formErrorCredentialsNotMatching": "The password is invalid or the user does not exist. Please try again.",
      "formErrorInvalidValue": "Please enter a valid value.",
      "formErrorRequiredField": "This field is required.",
      "formErrorSystemUnavailable": "System is unavailable, please try again later.",
      "id": "ID",
      "lastUpdatedAt": "Last updated at {{- timestamp}}",
      "listSeparator": ", ",
      "loading": "Loading, please wait...",
      "name": "Name",
      "no": "No",
      "noRecordsToDisplay": "No records to display",
      "notApplicable": "-",
      "notes": "Notes",
      "operationFailed": "Operation failed, please try again",
      "operationSuccess": "Operation completed successfully",
      "pageNotFound": "Page not found",
      "password": "Password",
      "phone": "Phone number",
      "print":"Print",
      "purchasedItems": "PURCHASED ITEMS:",
      "save": "Save",
      "search": "Search",
      "settings": "Settings",
      "signIn": "Sign in",
      "signingIn": "Signing you in, please wait...",
      "signInTitle": "Sign in to your account",
      "signOut": "Sign out",
      "tablePagination": "{from}-{to} of {count}",
      "tablePaginationFirst": "First page",
      "tablePaginationLast": "Last page",
      "tablePaginationNext": "Next page",
      "tablePaginationPrevious": "Previous page",
      "tableRows": "rows",
      "textFieldItemName": "Add item",
      "timeFormat": "h:mm aa",
      "unknown": "Unknown",
      "update": "Update",
      "yes": "Yes",
    }
  }
};