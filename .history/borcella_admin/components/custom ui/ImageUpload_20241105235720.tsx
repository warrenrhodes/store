import { Plus, Trash } from "lucide-react";

import { Button } from "../ui/button";
import Image from "next/image";
import toast from "react-hot-toast";
import { MediaType } from "@/lib/types";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const updateFile = async (file: File): Promise<MediaType | null> => {
    const formData = new FormData();
    formData.append("file", file);
    const result = await fetch("/api/media", {
      method: "POST",
      body: formData,
    });
    if (result.ok) {
      const data = await result.json();
      return data as MediaType;
    }
    return null;
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const media = await updateFile(file);
      if (media) {
        onChange(media.url);
      } else {
        toast.error(
          "Something went wrong when upload you image! Please try again."
        );
      }
    } catch (e) {
      toast.error(
        "Something went wrong when upload you image! Please try again."
      );
    }
  };

  const handleRemove = async (id: string) => {
    const res = await fetch(`/api/media/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      onRemove(url);
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button
                type="button"
                onClick={() => handleRemove(url)}
                size="sm"
                className="bg-red-500 text-white"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );
};

export default ImageUpload;
