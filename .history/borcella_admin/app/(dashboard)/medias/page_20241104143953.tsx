"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/custom ui/Loader";
import { mediColumns } from "@/components/medias/MediasColumns";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@radix-ui/react-alert-dialog";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { Input } from "postcss";
import { Label } from "recharts";

const Medias = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [medias, setMedia] = useState([]);

  const getMedias = async () => {
    try {
      const res = await fetch("/api/media", {
        method: "GET",
      });
      const data = await res.json();
      setMedia(data);
      setLoading(false);
    } catch (err) {
      console.log("[media_GET]", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMedias();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Medias</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Adds Media</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] absolute bg-black top-0 bottom-0 left-0 right-0">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={mediColumns} data={medias} searchKey="fileName" />
    </div>
  );
};

export default Medias;
