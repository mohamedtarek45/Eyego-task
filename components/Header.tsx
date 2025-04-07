"use client";
import { auth } from "../fIreBaseConfig";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import {RootState } from "@/components/store/store";
import { Button } from "./ui/button";
const Header = () => {
  const user = useSelector((state:RootState) => state.user);
  return (
    <div className="h-[60px] w-full flex justify-between items-center px-6 bg-gray-600 shadow-md sm:rounded-b-xl">
      <p className="text-white text-sm sm:text-xl font-semibold">Welcome {user.email}</p>
      <Button
        className="bg-white text-blue-600 hover:cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition-all duration-300 rounded-lg px-4 py-2"
        onClick={() => signOut(auth)}
      >
        <span className="hidden sm:block">Logout</span>
        <LogOut className="block sm:hidden w-5 h-5" />
      </Button>
    </div>
  );
};

export default Header;
