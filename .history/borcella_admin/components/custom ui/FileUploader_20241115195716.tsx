import { Film, Trash2, ImageIcon, Upload, Loader2 } from "lucide-react";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileType } from "../accordion/CustomAccordionItem";
import { Button } from "../ui/button";

interface FileUploaderProps {
  media: (string)[];
  setContent: (value: string) => void;
  fileType: FileType;
  maxFiles?: number;
  maxFileSize?: number;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  content,
  setContent,
  fileType = FileType.IMAGE,
  maxFiles = 5,
  maxFileSize = 5 * 1024 * 1024, // 5MB
}) => {
  const [files, setFiles] = useState<(File | string)[]>(content);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFileTypeText = (type: FileType) => {
    switch (type) {
      case FileType.IMAGE:
        return "images (JPEG, PNG, GIF, WEBP)";
      case FileType.VIDEO:
        return "videos (MP4, WEBM, OGG)";
      default:
        return "files";
    }
  };

  const validateFile = (file: File) => {
    const fileType = file.type.split("/")[0];
    if (fileType === FileType.IMAGE && ![FileType.IMAGE].includes(fileType)) {
      return "Only image files are allowed";
    }
    if (fileType === FileType.VIDEO && ![FileType.VIDEO].includes(fileType)) {
      return "Only video files are allowed";
    }
    if (file.size > maxFileSize) {
      return `File size must be less than ${maxFileSize / (1024 * 1024)}MB`;
    }
    return null;
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        const errorMessages = rejectedFiles.map((file) => {
          if (file.size > maxFileSize) return "File too large";
          return "Invalid file type";
        });
        setError(errorMessages[0]);
        return;
      }

      // Validate each file
      for (const file of acceptedFiles) {
        const error = validateFile(file);
        if (error) {
          setError(error);
          return;
        }
      }

      if (files.length + acceptedFiles.length > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`);
        return;
      }

      setFiles((prev) => [...prev, ...acceptedFiles]);
    },
    [files, maxFiles, maxFileSize, fileType]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept:
      fileType === FileType.VIDEO
        ? {
            "video/*": [".mp4", ".webm", ".ogg"],
          }
        : { "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"] },
    maxSize: maxFileSize,
    multiple: true,
  });

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setError(null);
  };

  const renderPreview = (file: File | string, index: number) => {
    if (typeof file === "string") {
      return (
        <div key={index} className="relative group">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={file}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-1 left-1 right-1 px-2 py-1 text-xs text-white bg-black/50 rounded truncate">
            {file}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeFile(index);
            }}
            className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 
              shadow-lg transition-opacity"
          >
            <Trash2 size={14} />
          </button>
        </div>
      );
    } else {
      const isVideo = file.type.startsWith("video/");
      const isImage = file.type.startsWith("image/");

      return (
        <div key={index} className="relative group">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            {isImage && (
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
                onLoad={() => URL.revokeObjectURL(file)}
              />
            )}
            {isVideo && (
              <div className="relative w-full h-full">
                <video
                  src={URL.createObjectURL(file)}
                  className="w-full h-full object-cover"
                  onLoadedMetadata={() => URL.revokeObjectURL(file)}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Film className="w-8 h-8 text-white" />
                </div>
              </div>
            )}
          </div>
          <div className="absolute bottom-1 left-1 right-1 px-2 py-1 text-xs text-white bg-black/50 rounded truncate">
            {file.name}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeFile(index);
            }}
            className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 
              shadow-lg transition-opacity"
          >
            <Trash2 size={14} />
          </button>
        </div>
      );
    }
  };

  const handleImport = async () => {
    if (files.length === 0) {
      setError("Please select at least one file");
      return;
    }

    setIsLoading(true);
    try {
      // Simulated upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Here you would typically upload the files to your server
      setContent(
        JSON.stringify(files.map((f) => (typeof f === "string" ? f : f.name)))
      );
      setFiles([]);
      setError(null);
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white shadow-lg p-6">
        <div
          {...getRootProps()}
          className={`relative rounded-lg border-2 border-dashed transition-colors
              ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
              ${error ? "border-red-500" : ""}
              hover:border-blue-500`}
        >
          <input {...getInputProps()} id="fileInput" />
          <div className="p-8 text-center">
            {fileType === FileType.IMAGE ? (
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            ) : fileType === FileType.VIDEO ? (
              <Film className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            ) : (
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            )}
            <p className="text-base text-gray-600">
              {isDragActive ? (
                <span className="text-blue-500">Drop files here...</span>
              ) : (
                <span>
                  Drag & drop {getFileTypeText(fileType)}, or{" "}
                  <span className="text-blue-500 cursor-pointer">browse</span>
                </span>
              )}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Maximum {maxFiles} files, up to {maxFileSize / (1024 * 1024)}MB
              each
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {files.length > 0 && (
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {files.map((file, index) => renderPreview(file, index))}
            </div>
          </div>
        )}

        <div className="mt-6 border-t border-gray-200 pt-6 flex gap-4">
          <Button
            onClick={() => {
              setFiles([]);
              setError(null);
            }}
            variant="outline"
            className="flex-1"
            disabled={isLoading || files.length === 0}
          >
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-md"
            disabled={isLoading || files.length === 0}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Import"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
