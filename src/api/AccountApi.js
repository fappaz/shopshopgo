import * as Authentication from "../database/firebase/Authentication";

export const signIn = async (email, password) => (await Authentication.signIn(email, password)).user;

export const signOut = async () => await Authentication.signOut();