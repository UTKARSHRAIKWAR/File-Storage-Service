import React from "react";

const FileCard = ({ file, onDownload, onShare }) => {
  const fileIcons = {
    pdf: "picture_as_pdf",
    image: "image",
    zip: "folder_zip",
    video: "videocam",
  };

  const fileColors = {
    pdf: "red",
    image: "blue",
    zip: "green",
    video: "purple",
  };

  const type = file.type || "pdf";
  const color = fileColors[type];

  return (
    <div className="bg-white dark:bg-background-dark/50 rounded-xl p-4 flex flex-col gap-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className={`material-symbols-outlined text-${color}-500 text-3xl`}
          >
            {fileIcons[type]}
          </span>
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            {file.name}
          </span>
        </div>
        <button className="text-gray-500 dark:text-gray-400 hover:text-primary">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>

      {type === "image" || type === "video" ? (
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100 dark:bg-background-dark flex items-center justify-center">
          {type === "image" ? (
            <div
              className="w-full h-full bg-center bg-cover"
              style={{ backgroundImage: `url(${file.url})` }}
            ></div>
          ) : (
            <span className="material-symbols-outlined text-white text-5xl">
              play_circle
            </span>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-24 bg-gray-100 dark:bg-background-dark rounded-lg">
          <span
            className={`material-symbols-outlined text-${color}-500 text-5xl`}
          >
            {fileIcons[type]}
          </span>
        </div>
      )}

      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>{file.size}</span>
        <span>{file.date}</span>
      </div>

      <div className="flex gap-2 mt-auto">
        <button
          className="flex-1 h-10 flex items-center justify-center gap-2 bg-primary/10 text-primary font-semibold rounded-lg hover:bg-primary/20 transition-colors"
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
