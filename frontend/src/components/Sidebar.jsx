import { useState } from "react";
import ProfileDialog from "./ProfileDialog";

const Sidebar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const currentUser = {
    name: "Alex Doe",
    email: "alex.doe@email.com",
    avatarUrl: "https://placehold.co/100x100/E2E8F0/4A5568?text=A",
    storage: { used: 50, total: 100 },
  };

  const handleLogout = () => {
    console.log("Logging out...");
    setIsProfileOpen(false);
  };

  return (
    <>
      <aside className="w-20 lg:w-64 bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg border-r border-white/20 dark:border-gray-700/50 p-4 lg:p-6 flex flex-col justify-between fixed h-full z-20">
        <div>
          <div className="flex items-center gap-2 mb-12">
            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-4xl">
              cloud
            </span>
            <h1 className="hidden lg:block text-2xl font-bold text-gray-900 dark:text-white">
              FileCloud
            </h1>
          </div>
          <nav className="flex flex-col gap-4">
            <a
              href="#!"
              className="flex items-center gap-4 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-500/20 dark:hover:bg-blue-400/20 transition-colors"
            >
              <span className="material-symbols-outlined">home</span>
              <span className="hidden lg:inline font-medium">Home</span>
            </a>
            <a
              href="#!"
              className="flex items-center gap-4 p-3 rounded-lg bg-blue-500/20 dark:bg-blue-400/30 text-blue-600 dark:text-blue-300 font-bold transition-colors"
            >
              <span className="material-symbols-outlined">folder</span>
              <span className="hidden lg:inline font-medium">My Files</span>
            </a>
            <a
              href="#!"
              className="flex items-center gap-4 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-500/20 dark:hover:bg-blue-400/20 transition-colors"
            >
              <span className="material-symbols-outlined">group</span>
              <span className="hidden lg:inline font-medium">Shared</span>
            </a>
            <a
              href="#!"
              className="flex items-center gap-4 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-500/20 dark:hover:bg-blue-400/20 transition-colors"
            >
              <span className="material-symbols-outlined">delete</span>
              <span className="hidden lg:inline font-medium">Trash</span>
            </a>
          </nav>
        </div>
        <div>
          <button
            onClick={() => setIsProfileOpen(true)}
            className="w-full flex items-center gap-4 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-500/20 dark:hover:bg-blue-400/20 transition-colors text-left"
          >
            <span className="material-symbols-outlined">account_circle</span>
            <span className="hidden lg:inline font-medium">Profile</span>
          </button>
        </div>
      </aside>

      <ProfileDialog
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onLogout={handleLogout}
        user={currentUser}
      />
    </>
  );
};

export default Sidebar;
