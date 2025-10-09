import React, { useRef } from "react";

const UploadCard = ({ onUpload }) => {
  const inputRef = useRef(null);

  const handleBrowse = () => inputRef.current.click();
  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    onUpload(files);
  };

  return (
    <div className="bg-white dark:bg-background-dark/50 rounded-xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 px-6 py-10 hover:border-primary/70 dark:hover:border-primary/50 transition-colors">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="material-symbols-outlined text-4xl text-gray-400 dark:text-gray-500">
            cloud_upload
          </span>
          <p className="text-base font-semibold text-gray-700 dark:text-gray-300">
            Drag & Drop files here
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            or click to browse
          </p>
        </div>
        <button
          className="mt-4 min-w-[84px] h-9 px-4 rounded-lg bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20 transition-colors"
          onClick={handleBrowse}
        >
          Browse
        </button>
        <input
          type="file"
          multiple
          ref={inputRef}
          className="hidden"
          onChange={handleFiles}
        />
      </div>
    </div>
  );
};

export default UploadCard;
