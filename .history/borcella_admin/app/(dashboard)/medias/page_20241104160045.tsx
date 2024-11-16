"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/custom ui/Loader";
import {
  useDialog,
  DialogProvider,
} from "@/components/custom ui/CustomDialogue";
import { mediColumns } from "@/components/medias/MediasColumns";

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
  const { openDialog } = useDialog();
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
        <DialogProvider dialogChildren={<AddMedia />}>
          <Button variant="outline" onProgress={openDialog}>
            Adds Media
          </Button>
        </DialogProvider>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={mediColumns} data={medias} searchKey="fileName" />
    </div>
  );
};

const AddMedia = () => {
  return (
    <input
      type="file"
      accept={"image/*"}
      // onChange={onFileUpload}
      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
  );
};

export default Medias;
