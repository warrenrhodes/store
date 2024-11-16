"use client";

import { useState } from "react";
import { Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

interface DeleteProps {
  item: string;
  handleDelete: () => Promise<boolean>;
}

const Delete: React.FC<DeleteProps> = ({ item, handleDelete }) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      const result = await handleDelete();

      if (result) {
        setLoading(false);
        window.location.href = `/${item}`;
        toast.success(`${item} deleted`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong! Please try again.");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="hover:bg-red-500/15 text-red-500 bg-red-500/10">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className=" text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-500/40 text-white hover:bg-red-500 hover:bg-red-500/40/70 "
            onClick={onDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
