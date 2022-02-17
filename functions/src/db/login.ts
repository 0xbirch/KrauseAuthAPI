import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as functions from "firebase-functions";

const login = async () => {
  const auth = getAuth();
  const user = await signInWithEmailAndPassword(
    auth,
    functions.config().fb.email as string,
    functions.config().fb.password as string
  )
    .then((userCredential) => {
      return userCredential;
    })
    .catch((error) => {
      console.error(error.code);
      console.error(error.message);
    });
  return user;
};

export default login;
