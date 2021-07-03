import React from 'react';
import * as ApiUtils from './ApiUtils';

export const ApiStatus = {
  loading: "loading",
  success: "success",
  error: "error",
};

/**
 * @typedef Account
 * @property {string} id The account ID.
 * @property {string} email The email address.
 * @property {string} name The account name.
 */

/**
 * @typedef UseAccountReturn
 * @property {Account} account The account.
 * @property {string} status The API request status, which is one of the ApiStatus values.
 */

/**
 * 
 * @param {string} id The account ID.
 * @returns {UseAccountReturn}
 */
export const useAccount = (id) => {
  const [account, setAccount] = React.useState(null);
  const [status, setStatus] = React.useState(ApiStatus.loading);

  React.useEffect(function loadAccount() {
    /** @TODO fetch from API */
    (async function getAccount() {
      try {
        setStatus(ApiStatus.loading);
        ApiUtils.sleep(1500);
        setAccount({
          id,
          email: "jdoe@fernandopaz.net",
          name: "John Foobar Doe"
        });
        setStatus(ApiStatus.success);
      } catch (error) {
        console.error(`Failed to fetch account. Error:`, error);
        setStatus(ApiStatus.error);
      }
    })();
  }, [id]);

  return {
    account,
    status,
  };
};