"use server";
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../fIreBaseConfig";

export const Auth = async (
  state: string,
  prevState: { message: string | null },
  formData: FormData
): Promise<
  { userID: string; email: string | null } | { message: string | null }
> => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { message: "Please fill in all the fields" };
  }
  try {
    let userCredential;
    if (state === "signup") {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } else {
      userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    }
    return {
      userID: userCredential.user.uid,
      email: userCredential.user.email,
    };
  } catch (error) {
    console.log(error);
    return { message: "Invalid email or password" };
  }
};
