"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/custom ui/Loader";
import DialogBox from "@/components/custom ui/CustomDialogue";
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
import Image from "next/image";
import { XCircle } from "lucide-react";

const Medias = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
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
        <Button variant="outline" onClick={() => setOpen(true)}>
          Show Dialog
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={mediColumns} data={medias} searchKey="fileName" />
      <DialogBox open={open} title={"Adds Media"} setOpen={setOpen}>
        <AddMedia />
      </DialogBox>
    </div>
  );
};

const AddMedia = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFiles([...files, file]);
  };

  const handleDeleteFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {files.map((file, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg overflow-hidden relative"
          >
            {file.type.startsWith("image/") ? (
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                width={300}
                height={300}
                className="w-full h-40 object-cover"
              />
            ) : file.type.startsWith("video/") ? (
              <video
                className="w-full h-40 object-cover"
                controls
                src={URL.createObjectURL(file)}
              />
            ) : (
              <div className="flex items-center justify-center h-40">
                <span className="text-gray-600">{file.name}</span>
              </div>
            )}
            <button
              className="absolute top-2 right-2 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-700"
              onClick={() => handleDeleteFile(index)}
            >
              <XCircle size={12} />
            </button>
          </div>
        ))}
      </div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );
};

export default Medias;
