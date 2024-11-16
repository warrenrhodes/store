import { Plus, Trash } from "lucide-react";

import { Button } from "../ui/button";
import Image from "next/image";
import toast from "react-hot-toast";
import { MediaType } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";

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
  const updateFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    const result = await fetch("/api/media", {
      method: "POST",
      body: formData,
    });
    if (result.ok) {
      const data = await result.json();
      return data.id;
    }
    return null;
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const mediaId = await updateFile(file);
      if (mediaId) {
        onChange(mediaId);
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

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((id) => (
          <TemporalImage key={id} id={id} onRemove={onRemove} />
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

const TemporalImage = ({
  id,
  onRemove,
}: {
  id: string;
  onRemove: (value: string) => void;
}) => {
  const [mediaUrl, setMediaUrl] = useState<string | null>();

  const fetchImageById = useCallback(async () => {
    const result = await fetch(`/api/media/${id}`, {
      method: "GET",
    });

    if (result.ok) {
      const data = await result.json();
      setMediaUrl((_) => data.mediaUrl);
    }
  }, [id]);

  const handleRemove = async (id: string) => {
    const res = await fetch(`/api/media/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      onRemove(id);
    }
  };

  useEffect(() => {
    fetchImageById();
  });
  return (
    mediaUrl && (
      <div className="relative w-[200px] h-[200px]">
        <div className="absolute top-0 right-0 z-10">
          <Button
            type="button"
            onClick={() => handleRemove(id)}
            size="sm"
            className="hover:bg-red-500/50 text-white bg-red-500/40 rounded-tl-none rounded-br-none"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
        <Image
          src={mediaUrl}
          alt="collection"
          className="object-cover rounded-lg"
          fill
        />
      </div>
    )
  );
};

export default ImageUpload;
