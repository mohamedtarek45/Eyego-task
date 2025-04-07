"use client";
import { userActions } from "@/components/store/user";
import { auth } from "@/fIreBaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user);
        dispatch(userActions.login({ userID: user.uid, email: user.email }));
        setLoading(false);
        return;
      } else {
        console.log("Urtrerser is not signed in.");
        return router.push("/auth");
      }
    });
  }, [router, dispatch]);
  const contentLoading = (
    <div className="flex w-full h-screen items-center justify-center">
      <p className="text-center text-4xl font-bold">Loading...</p>
    </div>
  );
  return <>{loading ? contentLoading : children}</>;
};

export default ProtectRoute;
