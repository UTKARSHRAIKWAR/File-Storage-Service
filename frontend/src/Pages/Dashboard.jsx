import React, { useState, useEffect } from "react";
import FileCard from "../components/FileCard";
import UploadCard from "../components/UploadCard";
import Sidebar from "../components/Sidebar";
import api from "../axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const getAuthToken = () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return userInfo?.token || null;
  } catch (error) {
    console.error("Could not parse userInfo from localStorage", error);
    return null;
  }
};

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate("/"); // Redirect to login if no token
      return; // Stop execution of the effect
    }

    const fetchFiles = async () => {
      try {
        const { data } = await api.get("/api/files", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFiles(data.files || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load files");
      }
    };
    fetchFiles();
  }, [navigate]);

  const handleUpload = async (newFiles) => {
    setLoading(true);
    const token = getAuthToken();
    if (!token) {
      toast.error("User not logged in");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      newFiles.forEach((f) => formData.append("file", f));
      const { data } = await api.post("/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setFiles((prev) => [data.file, ...prev]);
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("File upload failed", {
        description: error.response?.data?.message || "Try again later.",
      });
    } finally {
      setLoading(false);
      setIsUploadOpen(false);
    }
  };

  const handleDownload = async (file) => {
    const token = getAuthToken();
    if (!token) return toast.error("User not logged in");
    try {
      const { data } = await api.get(`/api/files/${file._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!data.url) throw new Error("No download URL received");
      window.open(data.url, "_blank");
    } catch (error) {
      console.error(error);
      toast.error("Download failed");
    }
  };

  const handleDelete = async (file) => {
    const token = getAuthToken();
    if (!token) return toast.error("User not logged in");
    try {
      await api.delete(`/api/files/${file._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles((prev) => prev.filter((f) => f._id !== file._id));
      toast.success("File is deleted!", {
        description: "File has been deleted.",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete file", {
        description: error.response?.data?.message || "Try again later.",
      });
    }
  };

  const handleShare = async (file) => {
    const token = getAuthToken();
    if (!token) return toast.error("User not logged in");
    try {
      const { data } = await api.get(`/api/files/share/${file._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!data.url) throw new Error("No share URL received");
      await navigator.clipboard.writeText(data.url);
      toast.success("Shareable link copied to clipboard!", {
        description: "Anyone with this link can access the file.",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate share link", {
        description: error.response?.data?.message || "Try again later.",
      });
    }
  };

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <main className="ml-20 lg:ml-64 flex-1 p-6 lg:p-10 relative">
        <div className="flex justify-between items-center mb-8">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search files..."
              className="w-full bg-white dark:bg-gray-800 rounded-full py-3 px-5 pl-12 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 dark:text-gray-200"
            />
            <span className="material-symbols-outlined absolute left-4 top-3.5 text-gray-400">
              search
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsUploadOpen(true)}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined">upload</span>
              {loading ? "Uploading..." : "Upload"}
            </button>
            {/* <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
              <img
                src="user"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div> */}
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
          My Files
        </h2>

        {files.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No files uploaded yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {files.map((file) => (
              <FileCard
                key={file._id}
                file={file}
                onDownload={handleDownload}
                onShare={handleShare}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <button
          onClick={() => setIsUploadOpen(true)}
          disabled={loading}
          className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-blue-700 transition-transform hover:scale-110 disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </main>

      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent
          aria-describedby="upload-dialog-description"
          className="max-w-md bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Upload Files
            </DialogTitle>
          </DialogHeader>
          <p id="upload-dialog-description" className="sr-only">
            Select or drag files to upload them securely to the cloud.
          </p>
          <UploadCard onUpload={handleUpload} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
