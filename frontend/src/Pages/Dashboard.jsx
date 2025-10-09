import React, { useState } from "react";
import UploadCard from "../components/UploadCard";
import FileCard from "../components/FileCard";

const Dashboard = () => {
  const [files, setFiles] = useState([
    {
      name: "photo_2023.jpg",
      type: "image",
      size: "2.5 MB",
      date: "Oct 27, 2023",
      url: "https://via.placeholder.com/300",
    },
    { name: "report.pdf", type: "pdf", size: "1.2 MB", date: "Oct 26, 2023" },
    { name: "archive.zip", type: "zip", size: "15.8 MB", date: "Oct 25, 2023" },
    {
      name: "meeting_record.mp4",
      type: "video",
      size: "55.1 MB",
      date: "Oct 24, 2023",
    },
  ]);

  const handleUpload = (newFiles) => {
    const formattedFiles = newFiles.map((file) => ({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      type: file.name.split(".").pop(),
      date: new Date().toLocaleDateString(),
      url: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...formattedFiles, ...prev]);
  };

  const handleDownload = (file) => alert(`Downloading ${file.name}`);
  const handleShare = (file) => alert(`Sharing ${file.name}`);

  return (
    // THEME FIX: Added a background gradient to the entire page for depth.
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Sidebar */}
      {/* THEME FIX: Replaced 'glassmorphic' with specific Tailwind classes for a proper effect. */}
      <aside className="w-20 lg:w-64 bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg border-r border-white/20 dark:border-gray-700/50 p-4 lg:p-6 flex flex-col justify-between fixed h-full z-20">
        <div>
          <div className="flex items-center gap-2 mb-12">
            {/* THEME FIX: Replaced 'primary' with a specific color for consistency. */}
            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-4xl">
              cloud
            </span>
            <h1 className="hidden lg:block text-2xl font-bold text-gray-900 dark:text-white">
              FileCloud
            </h1>
          </div>
          <nav className="flex flex-col gap-4">
            <a
              className="flex items-center gap-4 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-500/20 dark:hover:bg-blue-400/20 transition-colors"
              href="#!"
            >
              <span className="material-symbols-outlined">home</span>
              <span className="hidden lg:inline font-medium">Home</span>
            </a>
            <a
              className="flex items-center gap-4 p-3 rounded-lg bg-blue-500/20 dark:bg-blue-400/30 text-blue-600 dark:text-blue-300 font-bold transition-colors"
              href="#!"
            >
              <span className="material-symbols-outlined">folder</span>
              <span className="hidden lg:inline font-medium">My Files</span>
            </a>
            <a
              className="flex items-center gap-4 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-500/20 dark:hover:bg-blue-400/20 transition-colors"
              href="#!"
            >
              <span className="material-symbols-outlined">group</span>
              <span className="hidden lg:inline font-medium">Shared</span>
            </a>
            <a
              className="flex items-center gap-4 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-500/20 dark:hover:bg-blue-400/20 transition-colors"
              href="#!"
            >
              <span className="material-symbols-outlined">delete</span>
              <span className="hidden lg:inline font-medium">Trash</span>
            </a>
          </nav>
        </div>
        <div>
          <a
            className="flex items-center gap-4 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-500/20 dark:hover:bg-blue-400/20 transition-colors"
            href="#!"
          >
            <span className="material-symbols-outlined">account_circle</span>
            <span className="hidden lg:inline font-medium">Profile</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-20 lg:ml-64 flex-1 p-6 lg:p-10">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8">
          My Files
        </h2>

        {/* Combined Upload and Files into a single grid for layout consistency */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <UploadCard onUpload={handleUpload} />
          {files.map((file, idx) => (
            <FileCard
              key={idx}
              file={file}
              onDownload={handleDownload}
              onShare={handleShare}
            />
          ))}
        </div>

        {/* Floating Action Button */}
        {/* THEME FIX: Updated button color to match the new palette. */}
        <button className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-blue-700 transition-transform hover:scale-110">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </main>
    </div>
  );
};

export default Dashboard;
