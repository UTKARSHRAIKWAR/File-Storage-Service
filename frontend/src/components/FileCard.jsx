import React from "react";

// Icon components (using inline SVG for simplicity)
const FileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-blue-500"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
  </svg>
);

const MoreIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="19" cy="12" r="1"></circle>
    <circle cx="5" cy="12" r="1"></circle>
  </svg>
);

const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const ShareIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
    <polyline points="16 6 12 2 8 6"></polyline>
    <line x1="12" y1="2" x2="12" y2="15"></line>
  </svg>
);

// Reusable FileCard component
const FileCard = ({ fileName, fileSize, date }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-xs mx-auto transition-all hover:shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FileIcon />
          <span className="font-semibold text-gray-800 text-base">
            {fileName}
          </span>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <MoreIcon />
        </button>
      </div>

      <div className="flex items-center justify-between text-gray-500 text-sm mb-12">
        <span>{fileSize}</span>
        <span>{date}</span>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 font-bold py-3 px-4 rounded-xl hover:bg-indigo-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
          <DownloadIcon />
          <span>Download</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-bold py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
          <ShareIcon />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default FileCard;
