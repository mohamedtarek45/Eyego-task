"use client";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { userActions } from "@/components/store/user";
export const handleAuthSubmit = async ({
  e,
  authState,
  dispatch,
  setMessage,
  auth,
  router,
}: {
  e: React.FormEvent<HTMLFormElement>;
  authState: string;
  dispatch: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  auth: any;  // eslint-disable-line @typescript-eslint/no-explicit-any
  router: any;  // eslint-disable-line @typescript-eslint/no-explicit-any
}) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  if (!email?.trim() || !password?.trim()||(authState === "signup" && !confirmPassword?.trim())) {
    return setMessage("Please fill in all the fields");
  }
  if (password !== confirmPassword && authState === "signup") {
    return setMessage("Passwords do not match");
  }
  try {
    let userCredential;
    if (authState === "signup") {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } else {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    }
    dispatch(
      userActions.login({
        userID: userCredential.user.uid,
        email: userCredential.user.email,
      })
    );
    router.push("/");
  } catch (error) {
    console.log(error);
    setMessage("Authentication failed");
  }
};
