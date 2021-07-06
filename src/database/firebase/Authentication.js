import { auth } from "./FirebaseConfig";

export const signIn = async (email, password) => await auth.signInWithEmailAndPassword(email, password);

export const signOut = async () => await auth.signOut();