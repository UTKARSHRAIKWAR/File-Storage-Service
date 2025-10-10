import React, { useRef, useState } from "react";

const UploadCard = ({ onUpload }) => {
  const inputRef = useRef(null);
  // NEW: State to track when a file is being dragged over the component
  const [isDragging, setIsDragging] = useState(false);

  // --- Event Handlers ---

  const handleBrowse = () => inputRef.current.click();

  // A single handler for both browse and drop
  const handleFiles = (files) => {
    // Convert FileList to an array and pass to the parent
    onUpload(Array.from(files));
  };

  // --- Drag & Drop Handlers ---

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Necessary to allow the drop
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    // Get the files from the drop event
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  // Dynamic classes for visual feedback
  const dropzoneClasses = isDragging
    ? "border-primary bg-primary/10" // Styles when dragging
    : "border-gray-300 dark:border-gray-700 hover:border-primary/70 dark:hover:border-primary/50"; // Default styles

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col gap-4">
      {/* ADDED: Drag and drop event handlers */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 transition-colors ${dropzoneClasses}`}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="material-symbols-outlined text-4xl text-gray-400 dark:text-gray-500">
            cloud_upload
          </span>
          <p className="text-base font-semibold text-gray-700 dark:text-gray-300">
            Drag & Drop files here
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            or click browse
          </p>
        </div>
        <button
          className="mt-4 min-w-[84px] h-9 px-4 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-500/20 transition-colors"
          onClick={handleBrowse}
        >
          Browse
        </button>
        <input
          type="file"
          multiple
          ref={inputRef}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    </div>
  );
};

export default UploadCard;
