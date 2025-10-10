import React, { useState, useEffect } from "react";
// Assuming your axios config is in the parent `src` directory.
// Adjust this path if your file structure is different.
import api from "../axios";

// HELPER 1: Get the simple type from the full MIME type
const getTypeFromMime = (mimeType) => {
  if (!mimeType) return "default";
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType === "application/pdf") return "pdf";
  if (
    mimeType === "application/zip" ||
    mimeType === "application/x-zip-compressed"
  )
    return "zip";
  return "default";
};

// HELPER 2: Format bytes into a readable string (KB, MB)
const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const FileCard = ({ file, onDownload, onShare, onDelete }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fileConfig = {
    pdf: { icon: "picture_as_pdf", colorClass: "text-red-500" },
    image: { icon: "image", colorClass: "text-blue-500" },
    zip: { icon: "folder_zip", colorClass: "text-green-500" },
    video: { icon: "videocam", colorClass: "text-purple-500" },
    default: { icon: "article", colorClass: "text-gray-500" },
  };

  // Using file.mimeType (camelCase) for consistency
  const type = getTypeFromMime(file.mimeType);
  const { icon, colorClass } = fileConfig[type];

  useEffect(() => {
    // Only try to fetch a preview if the file is an image
    if (type === "image") {
      setIsLoading(true);
      const getPreviewUrl = async () => {
        try {
          const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
          if (!token) return;

          const { data } = await api.get(`/api/files/preview/${file._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (data.url) {
            setPreviewUrl(data.url);
          }
        } catch (error) {
          console.error(
            "Failed to fetch preview URL for",
            file.fileName,
            error
          );
        } finally {
          setIsLoading(false);
        }
      };
      getPreviewUrl();
    } else {
      setIsLoading(false); // Not an image, no preview to load
    }
  }, [file._id, file.fileName, type]); // Rerun if the file changes

  const displayDate = file.createdAt
    ? new Date(file.createdAt).toLocaleDateString()
    : new Date().toLocaleDateString();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 flex flex-col gap-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className={`material-symbols-outlined ${colorClass} text-3xl`}>
            {icon}
          </span>
          <span
            className="font-semibold text-gray-800 dark:text-gray-200 truncate"
            title={file.fileName || "untitled"}
          >
            {file.fileName || "untitled"}
          </span>
        </div>
        <button
          onClick={() => onDelete(file)}
          className="text-gray-500 dark:text-gray-400 hover:text-red-500 flex-shrink-0 transition-colors"
          aria-label="Delete file"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>

      {type === "image" ? (
        <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
          {isLoading ? (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          ) : previewUrl ? (
            <img
              src={previewUrl}
              alt={`Preview of ${file.fileName}`} // Using file.fileName for consistency
              className="w-full h-full object-cover"
              onError={() => setPreviewUrl(null)} // Handle broken image links
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <span
                className={`material-symbols-outlined ${colorClass} text-5xl`}
              >
                broken_image
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-24 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <span className={`material-symbols-outlined ${colorClass} text-5xl`}>
            {icon}
          </span>
        </div>
      )}

      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>{formatFileSize(file.size)}</span>
        <span>{displayDate}</span>
      </div>

      <div className="flex gap-2 mt-auto">
        <button
          className="flex-1 h-10 flex items-center justify-center gap-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold rounded-lg hover:bg-blue-500/20 transition-colors"
          onClick={() => onDownload(file)}
        >
          <span className="material-symbols-outlined text-base">download</span>
          Download
        </button>
        <button
          className="flex-1 h-10 flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          onClick={() => onShare(file)}
        >
          <span className="material-symbols-outlined text-base">share</span>
          Share
        </button>
      </div>
    </div>
  );
};

export default FileCard;
