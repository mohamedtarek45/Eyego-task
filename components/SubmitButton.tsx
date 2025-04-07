"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
const SubmitButton = ({ text ,loading }: { text: string; loading: boolean }) => {
  console.log("loading",loading);
  return (
    <Button className="hover:cursor-pointer" disabled={loading}>
      {loading && <Loader2 className="animate-spin" />}
      {loading ? "Please wait" : text}
    </Button>
  );
};

export default SubmitButton;
