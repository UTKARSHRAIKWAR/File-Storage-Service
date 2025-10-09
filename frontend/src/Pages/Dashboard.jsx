import React, { useState, useEffect } from "react";

// --- ICON COMPONENTS (using inline SVG for self-containment) ---
// Using Material Symbols as SVG components to keep everything in one file.

const Icon = ({ name, className }) => {
  const icons = {
    cloud: (
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96z" />
    ),
    home: <path d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" />,
    folder: (
      <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
    ),
    group: (
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05c1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    ),
    delete: (
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    ),
    account_circle: (
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22c.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z" />
    ),
    search: (
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z" />
    ),
    upload: <path d="M9 16h6v-6h4l-7-7l-7 7h4zm-4 2h14v2H5z" />,
    notifications: (
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    ),
    more_vert: (
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2z" />
    ),
    image: (
      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
    ),
    picture_as_pdf: (
      <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3.5h-2v-1h2v1zm0 2h-2v-1h2v1zm-2.5-3.5H15v1h1.5v-1z" />
    ),
    folder_zip: (
      <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-2 8h-2v2h-2v-2h-2v-2h2v-2h2v2h2v2z" />
    ),
    videocam: (
      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
    ),
    play_circle: (
      <path d="M10 16.5v-9l6 4.5-6 4.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    ),
    download: <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />,
    share: (
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.18c.52.47 1.2.77 1.96.77 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 8.82C7.52 8.34 6.81 8 6 8c-1.66 0-3 1.34-3 3s1.34 3 3 3c.81 0 1.52-.34 2.04-.82l7.12 4.16c-.05.21-.08.43-.08.66 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z" />
    ),
    add: <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />,
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {icons[name]}
    </svg>
  );
};

// --- SIDEBAR COMPONENT ---
const Sidebar = () => {
  const navItems = [
    { name: "Home", icon: "home", active: false },
    { name: "My Files", icon: "folder", active: true },
    { name: "Shared", icon: "group", active: false },
    { name: "Trash", icon: "delete", active: false },
  ];

  return (
    <aside className="w-20 lg:w-64 bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg border-r border-white/30 dark:border-white/10 p-4 lg:p-6 flex flex-col justify-between fixed h-full z-20">
      <div>
        <div className="flex items-center gap-2 mb-12">
          <Icon name="cloud" className="text-indigo-500 text-4xl" />
          <h1 className="hidden lg:block text-2xl font-bold text-gray-900 dark:text-white">
            FileCloud
          </h1>
        </div>
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                item.active
                  ? "bg-indigo-500/20 dark:bg-indigo-500/30 text-indigo-500"
                  : "text-gray-700 dark:text-gray-300 hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20"
              }`}
            >
              <Icon
                name={item.icon}
                className={`w-6 h-6 ${
                  item.active
                    ? "text-indigo-500"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              />
              <span className="hidden lg:inline font-medium">{item.name}</span>
            </a>
          ))}
        </nav>
      </div>
      <div>
        <a
          href="#"
          className="flex items-center gap-4 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 transition-colors"
        >
          <Icon
            name="account_circle"
            className="w-6 h-6 text-gray-700 dark:text-gray-300"
          />
          <span className="hidden lg:inline font-medium">Profile</span>
        </a>
      </div>
    </aside>
  );
};

// --- HEADER COMPONENT ---
const Header = () => (
  <header className="flex items-center justify-between mb-8">
    <label className="relative hidden sm:block w-full max-w-md">
      <Icon
        name="search"
        className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
      />
      <input
        className="form-input w-full pl-12 pr-4 py-3 rounded-xl border-none bg-white dark:bg-gray-800/50 placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500"
        placeholder="Search files..."
        type="search"
      />
    </label>
    <div className="flex items-center gap-4 ml-auto">
      <button className="hidden md:flex items-center justify-center gap-2 h-12 px-6 bg-indigo-500 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-500/90 transition-colors">
        <Icon name="upload" className="w-5 h-5" />
        <span>Upload</span>
      </button>
      <button className="relative w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-800/50 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-colors">
        <Icon
          name="notifications"
          className="w-6 h-6 text-gray-600 dark:text-gray-300"
        />
        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-gray-100 dark:border-gray-900"></span>
      </button>
      <div className="relative">
        <button className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500/50">
          <img
            className="w-full h-full object-cover"
            src="https://placehold.co/100x100/6347eb/white?text=A"
            alt="User avatar"
          />
        </button>
      </div>
    </div>
  </header>
);

// --- FILE CARD COMPONENT ---
const FileCard = ({ fileType, fileName, fileSize, date, preview }) => {
  const fileIcons = {
    image: { icon: "image", color: "text-blue-500" },
    pdf: { icon: "picture_as_pdf", color: "text-red-500" },
    zip: { icon: "folder_zip", color: "text-green-500" },
    video: { icon: "videocam", color: "text-purple-500" },
  };

  const { icon, color } = fileIcons[fileType] || {
    icon: "folder",
    color: "text-gray-500",
  };

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 flex flex-col gap-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon name={icon} className={`${color} w-8 h-8`} />
          <span className="font-semibold text-gray-800 dark:text-gray-200 truncate">
            {fileName}
          </span>
        </div>
        <button className="text-gray-500 dark:text-gray-400 hover:text-indigo-500">
          <Icon name="more_vert" className="w-6 h-6" />
        </button>
      </div>

      <div className="aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        {preview.type === "image" ? (
          <img
            src={preview.url}
            alt={fileName}
            className="w-full h-full object-cover"
          />
        ) : (
          <Icon name={preview.icon} className={`${color} w-12 h-12`} />
        )}
      </div>

      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>{fileSize}</span>
        <span>{date}</span>
      </div>

      <div className="flex gap-2 mt-auto">
        <button className="flex-1 h-10 flex items-center justify-center gap-2 bg-indigo-500/10 text-indigo-500 font-semibold rounded-lg hover:bg-indigo-500/20 transition-colors">
          <Icon name="download" className="w-4 h-4" />
          <span>Download</span>
        </button>
        <button className="flex-1 h-10 flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          <Icon name="share" className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        // --- Replace this mock data with your actual API call ---
        // const response = await fetch('/api/files/');
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        // const data = await response.json();

        // --- Using mock data for demonstration ---
        const mockData = [
          {
            id: "1",
            name: "photo_2023.jpg",
            mimeType: "image/jpeg",
            size: "2.5 MB",
            createdAt: "2023-10-27T10:00:00Z",
            url: "https://images.unsplash.com/photo-1695653422853-06d88812a382?q=80&w=2071&auto=format&fit=crop",
          },
          {
            id: "2",
            name: "report.pdf",
            mimeType: "application/pdf",
            size: "1.2 MB",
            createdAt: "2023-10-26T14:30:00Z",
          },
          {
            id: "3",
            name: "archive.zip",
            mimeType: "application/zip",
            size: "15.8 MB",
            createdAt: "2023-10-25T09:15:00Z",
          },
          {
            id: "4",
            name: "meeting_recording.mp4",
            mimeType: "video/mp4",
            size: "55.1 MB",
            createdAt: "2023-10-24T18:00:00Z",
          },
        ];

        // This function transforms the API data to match the FileCard component's props
        const transformedData = mockData.map((file) => {
          const getFileType = (mimeType) => {
            if (mimeType.startsWith("image/")) return "image";
            if (mimeType === "application/pdf") return "pdf";
            if (mimeType === "application/zip") return "zip";
            if (mimeType.startsWith("video/")) return "video";
            return "file"; // default
          };

          const fileType = getFileType(file.mimeType);

          let preview;
          if (fileType === "image") {
            preview = { type: "image", url: file.url };
          } else {
            const previewIconMap = {
              pdf: "picture_as_pdf",
              zip: "folder_zip",
              video: "play_circle",
            };
            preview = {
              type: "icon",
              icon: previewIconMap[fileType] || "folder",
            };
          }

          return {
            id: file.id,
            fileType: fileType,
            fileName: file.name,
            fileSize: file.size,
            date: new Date(file.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            preview: preview,
          };
        });

        setFiles(transformedData);
        // --- End of mock data section ---
      } catch (error) {
        console.error("Failed to fetch files:", error);
        // Optionally, set an error state here to show an error message in the UI
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <div className="font-sans text-gray-800 dark:text-gray-200">
      <div className="relative flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <main className="ml-20 lg:ml-64 flex-1 p-6 lg:p-10">
          <Header />
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              My Files
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Skeleton loaders for better UX */}
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800/50 rounded-xl p-4 flex flex-col gap-4 shadow-sm animate-pulse"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                    </div>
                    <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="aspect-video rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {files.map((file) => (
                <FileCard key={file.id} {...file} />
              ))}
            </div>
          )}

          <button className="fixed bottom-8 right-8 w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-indigo-500/90 transition-transform hover:scale-110">
            <Icon name="add" className="w-8 h-8" />
          </button>
        </main>
      </div>
    </div>
  );
}
