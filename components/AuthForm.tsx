"use client";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/SubmitButton";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../fIreBaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { handleAuthSubmit } from "@/lib/handleSubmit";
import { userActions } from "./store/user";

const AuthForm = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string | null>(null);
  const [authState, setAuthState] = useState("login");
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const router = useRouter();
  const handle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading2(true);

    await handleAuthSubmit({
      e,
      authState,
      dispatch,
      setMessage,
      auth,
      router,
    });

    setLoading2(false);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(userActions.login({ userID: user.uid, email: user.email }));
        return router.push("/");
      }
      setLoading(false);
    });
  }, [router, dispatch]);

  const contentLoading = (
    <p className="text-center text-4xl font-bold">Loading...</p>
  );
  if (loading) {
    return contentLoading;
  }
  return (
    <form className="flex flex-col gap-[30px] items-center" onSubmit={handle}>
      <Input type="email" placeholder="Email" name="email" />
      <Input type="password" placeholder="Password" name="password" />
      {authState === "signup" && (
        <Input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
        />
      )}

      {message && <p className="text-red-500">{message}</p>}
      <SubmitButton  text={authState === "login" ? "login" : "Sign Up"} loading={loading2}/>
      <p
        onClick={() =>
          setAuthState((prevState) =>
            prevState === "login" ? "signup" : "login"
          )
        }
        className="hover:cursor-pointer hover:underline"
      >
        {authState === "login"
          ? "Don't have an account?"
          : "Already have an account?"}
      </p>
    </form>
  );
};

export default AuthForm;
