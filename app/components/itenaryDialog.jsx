import React from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ItenaryForm from "./itenaryForm";

const ItenaryDialog = () => {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Trip to next Destination</DialogTitle>
      </DialogHeader>
      <div className="flex items-center space-x-2">
        <ItenaryForm />
      </div>
    </DialogContent>
  );
};

export default ItenaryDialog;
